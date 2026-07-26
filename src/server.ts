// noinspection JSUnusedGlobalSymbols

import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import compression from 'compression';
import express, {type Express, type NextFunction} from 'express';
import { join } from 'node:path';
import { constants } from 'node:zlib';

const browserDistFolder = join(import.meta.dirname, '../browser');

/**
 * Hosts this app answers on. Ports are ignored, so no per-port entries are needed.
 * 127.0.0.1 is required for the container's own Docker HEALTH CHECK.
 */
const ALLOWED_HOSTS = [
  'localhost',
  '127.0.0.1',
  'mcmodersd.de',
  'www.mcmodersd.de',
  'dev.mcmodersd.de',
  'home.mcmodersd.de',
  'dedi.mcmodersd.de',
];

/**
 * True only for the compiled bundle run standalone (`node server.mjs`, directly or under PM2) -
 * the container actually exposed behind Caddy. `ng serve` loads this same file as a module for its
 * own SSR middleware, where isMainModule is false.
 */
const isProdServer = isMainModule(import.meta.url) || !!process.env['pm_id'];

/**
 * Opt-in switch for testing the dev server from another device on the LAN (a phone, say): run
 * `npm run start:lan` instead of `npm start`. That passes --host through to `ng serve`, which is
 * otherwise never on the command line, so its mere presence is enough to detect - no separate flag
 * to remember. Left off, the host allowlist below stays exactly as strict as it always was, and
 * plain `npm start` prints none of Angular's or Vite's "any host is allowed" warnings.
 */
const lanTestingEnabled = !isProdServer && process.argv.includes('--host');

const app: Express = express();
const angularApp = new AngularNodeAppEngine({
  // Behind the HAProxy reverse proxy on mcmodersd.de / www.mcmodersd.de.
  trustProxyHeaders: ['x-forwarded-for', 'x-forwarded-proto', 'x-forwarded-host'],
  // Explicit allowlist so the app is only reachable via these hosts, regardless of any
  // "NG_ALLOWED_HOSTS" set (or missing) on the deployment. Kept as a second line of defense
  // behind the middleware below, which normally rejects a bad host long before this runs.
  allowedHosts: lanTestingEnabled ? ['*'] : ALLOWED_HOSTS,
});

/**
 * Splits a host header into bare host names, dropping ports. Handles the comma-separated form
 * a chain of proxies produces, and the bracketed "[::1]:4000" form of an IPv6 literal.
 */
function hostnames(value: string | string[] | undefined): string[] {
  return (Array.isArray(value) ? value : value ? [value] : [])
    .flatMap((entry: string): string[] => entry.split(','))
    .map((entry: string): string => {
      const host: string = entry.trim().toLowerCase();
      return host.match(/^\[(.+)]/)?.[1] ?? host.replace(/:\d+$/, '');
    });
}

/**
 * The container publishes 4000 on every interface, so anything scanning the public IP reaches
 * this app directly as "142.132.219.168:4000". Angular's own host check does reject those, but
 * console. Error a paragraph per request and drowns "docker logs" in it. Reject them here first,
 * quietly.
 */
app.use((req, res, next: NextFunction): void => {
  if (lanTestingEnabled) {
    next();
    return;
  }

  // Every host name on the request has to be known, not just one of them: Angular validates the
  // Host header, and an x-forwarded-host that disagrees with it means the proxy in front is not
  // ours. Being stricter than Angular here is the point - anything it would reject is already
  // gone by now, so it never gets to log.
  const hosts = [...hostnames(req.headers.host), ...hostnames(req.headers['x-forwarded-host'])];

  if (req.headers.host && hosts.every((host) => ALLOWED_HOSTS.includes(host))) {
    next();
    return;
  }

  // 421 rather than 400: the request is well-formed, this server just does not serve that host.
  res.status(421).end();
});

/**
 * Nothing in front of this app compresses, so the SSR HTML, the JS bundle and the CSS all went
 * out uncompressed (Lighthouse: "usesCompression: false", ~448 KB of raw text per cold load).
 */
app.use(
  compression({
    // Default brotli quality is 4. The hashed bundles are immutable and cached for a year,
    // and the HTML is pre rendered, so a little more CPU per response is cheap here.
    brotli: { params: { [constants.BROTLI_PARAM_QUALITY]: 6 } },
  }),
);

/**
 * Security headers. Kept to the ones that are safe to set blindly - a real CSP needs the
 * Angular inline styles worked out first, so it is deliberately not set here.
 */
app.use((_req, res, next: NextFunction): void => {
  // Only meaningful over HTTPS, which HAProxy terminates in front of us.
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

/**
 * Resolves a GitHub repository's latest release tag via the redirect from
 * /releases/latest to /releases/tag/<version> instead of the REST API,
 * used as a fallback once the client hits the API's rate limit.
 */
app.get('/api/latest-tag/:owner/:repo', async (req, res): Promise<void> => {
  const { owner, repo } = req.params;
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) {
    res.status(400).json({ error: 'Invalid owner or repo' });
    return;
  }

  try {
    const response: Response = await fetch(`https://github.com/${owner}/${repo}/releases/latest`, { redirect: 'follow' });
    const tag: string | undefined = response.url.match(/\/releases\/tag\/([^/]+)$/)?.[1];
    if (!tag) {
      res.status(502).json({ error: 'Could not determine latest tag' });
      return;
    }

    res.json({ tag });
  } catch {
    res.status(502).json({ error: 'Request to GitHub failed' });
  }
});

/** Angular puts a content hash in the filename of everything it emits, e.g. main-4347P3KX.js. */
const HASHED_ASSET: RegExp = /-[A-Z0-9]{8}\.[a-z0-9]+$/;

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    index: false,
    redirect: false,
    setHeaders: (res, path) => {
      // A year is only safe for hashed filenames. Files copied verbatim out of /public
      // (favicon.ico, robots.txt, sitemap.xml) keep their name when their content changes.
      res.set(
        'Cache-Control',
        HASHED_ASSET.test(path) ? 'public, max-age=31536000, immutable' : 'public, max-age=3600',
      );
    },
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next: NextFunction): void => {
  res.set('Cache-Control', 'no-cache');
  angularApp
    .handle(req)
    .then((response: Response | null): void | Promise<void> =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    ).catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is run via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isProdServer) {
  const port: string | 4000 = process.env['PORT'] || 4000;
  app.listen(port, (error: Error | undefined): void => {
    if (error) throw error;
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler: Express = createNodeRequestHandler(app);