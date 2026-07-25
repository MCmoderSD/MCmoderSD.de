# [MCmoderSD.de](https://mcmodersd.de)

My personal portfolio and homepage. It presents
who I am, the projects I've built, the open-source dependencies I maintain, and the self-hosted
services running on my home server, alongside the required imprint and privacy policy pages.

## Purpose

This site is the public front door to my work: a single place that points to my projects on GitHub,
credits and links back to the open-source packages I publish, and exposes a few of my self-hosted
services (Jellyfin, Nexus, a speed test, ...) to anyone who wants to use them.

## Tech stack

- **[Angular](https://angular.dev)** (v22) with standalone-first, signal-based components
- **Server-side rendering & prerendering** via `@angular/ssr`, served through an **Express** server
- **Angular Material** for base theming, layered with a custom design system (CSS custom properties,
  OKLCh colors, wide-gamut/P3 support, and a dark/light color scheme switch)
- **TypeScript**, **SCSS**, and **Vitest** for unit tests

## Goal

Keep a fast, accessible, good-looking personal site that stays cheap to run and easy to extend: new
projects, dependencies, or services are just new entries in a preset list, not new pages to build.
Accessibility (WCAG AA, full AXE compliance) and a polished dark/light experience are treated as
requirements, not afterthoughts.

## Deployment

Every push to the `angular` branch triggers the
[`Build and Push`](.github/workflows/publish.yaml.yml) GitHub Actions workflow, which:

1. Checks out the repository.
2. Builds a multi-stage, multi-architecture (`linux/amd64` + `linux/arm64/v8`) Docker image via
   Buildx (see the [`Dockerfile`](Dockerfile)).
3. Pushes the image to Docker Hub as `mcmodersd/mcmodersd.de:angular-latest`.

The image itself builds the Angular app (SSR + prerendering), then discards all dev dependencies and
source for a minimal, non-root production runtime that serves the app with Node/Express on port
`4000`.

## Hosting

The production server pulls and runs the published image with **Docker Compose**
([`docker-compose.yaml`](docker-compose.yaml)):

```bash
docker compose up -d
```

The container restarts automatically, always pulls the latest tag, and exposes port `4000`, which
sits behind a reverse proxy (HAProxy) terminating TLS for `mcmodersd.de` and `www.mcmodersd.de`.

## Development

```bash
npm install
npm start        # ng serve, http://localhost:4200
npm test         # unit tests (Vitest)
npm run build    # production build (SSR + prerendering) into dist/Webpage
```

## License

[BSD 3-Clause](LICENSE) © Seraphin Berger
