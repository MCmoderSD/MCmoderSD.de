import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import { join } from 'node:path';
import { constants } from 'node:zlib';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine({
  // Behind the HAProxy reverse proxy on mcmodersd.de / www.mcmodersd.de.
  trustProxyHeaders: ['x-forwarded-for', 'x-forwarded-proto', 'x-forwarded-host'],
  // Explicit allowlist so the app is only reachable via these hosts, regardless of any
  // "NG_ALLOWED_HOSTS" set (or missing) on the deployment. Ports are ignored by Angular's
  // host check, so no per-port entries are needed. 127.0.0.1 is required for the container's
  // own Docker HEALTHCHECK.
  allowedHosts: [
    'localhost',
    '127.0.0.1',
    'dedi.mcmodersd.de',
    'mcmodersd.de',
    'www.mcmodersd.de',
    'home.mcmodersd.de',
    'dev.mcmodersd.de',
  ],
});

/**
 * Nothing in front of this app compresses, so the SSR HTML, the JS bundle and the CSS all went
 * out uncompressed (Lighthouse: "usesCompression: false", ~448 KB of raw text per cold load).
 */
app.use(
  compression({
    // Default brotli quality is 4. The hashed bundles are immutable and cached for a year,
    // and the HTML is prerendered, so a little more CPU per response is cheap here.
    brotli: { params: { [constants.BROTLI_PARAM_QUALITY]: 6 } },
  }),
);

/**
 * Security headers. Kept to the ones that are safe to set blindly - a real CSP needs the
 * Angular inline styles worked out first, so it is deliberately not set here.
 */
app.use((_req, res, next) => {
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
app.get('/api/latest-tag/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) {
    res.status(400).json({ error: 'Invalid owner or repo' });
    return;
  }

  try {
    const response = await fetch(`https://github.com/${owner}/${repo}/releases/latest`, { redirect: 'follow' });
    const tag = response.url.match(/\/releases\/tag\/([^/]+)$/)?.[1];
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
const HASHED_ASSET = /-[A-Z0-9]{8}\.[a-z0-9]+$/;

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
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);