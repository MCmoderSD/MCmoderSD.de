import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

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

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
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