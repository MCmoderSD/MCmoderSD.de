# ---- Stage 1: Dependencies (für Build, inkl. devDependencies) ----
FROM node:26-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ---- Stage 2: Build ----
FROM node:26-alpine AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---- Stage 3: Production-only Dependencies ----
FROM node:26-alpine AS prod-deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- Stage 4: Runtime Image ----
FROM node:26-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

RUN addgroup -S angular && adduser -S angular -G angular

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist/webpage ./dist/webpage
COPY --from=build /app/package.json ./package.json

USER angular

EXPOSE 4000

CMD ["node", "dist/webpage/server/server.mjs"]
