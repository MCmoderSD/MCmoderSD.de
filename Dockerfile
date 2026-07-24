# ---- Stage 1: Dependencies (for build, incl. devDependencies) ----
FROM node:26-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- Stage 2: Build ----
FROM node:26-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---- Stage 3: Production-only dependencies ----
FROM node:26-alpine AS prod-deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# ---- Stage 4: Runtime image ----
FROM node:26-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

RUN addgroup -S angular && adduser -S angular -G angular

COPY --from=prod-deps --chown=angular:angular /app/node_modules ./node_modules
COPY --from=build --chown=angular:angular /app/dist/Webpage ./dist/Webpage
COPY --from=build --chown=angular:angular /app/package.json ./package.json

USER angular

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "dist/Webpage/server/server.mjs"]
