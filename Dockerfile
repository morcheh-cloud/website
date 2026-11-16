# syntax=docker/dockerfile:1
#
# Morche website (Next.js, standalone output). Every page is prerendered at
# build time, so the public address is baked in then:
#   docker build --build-arg NEXT_PUBLIC_SITE_URL=https://morche.ir -t morche-website .
#   docker run -p 3300:3300 morche-website

ARG NODE_VERSION=26.12.1
ARG PNPM_VERSION=12.8.1

# ---- dependencies -------------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS deps
WORKDIR /app
ARG PNPM_VERSION
# Node 25+ ships without corepack.
RUN npm install -g pnpm@${PNPM_VERSION}
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---- build --------------------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS build
WORKDIR /app
ARG PNPM_VERSION
RUN npm install -g pnpm@${PNPM_VERSION}
ARG NEXT_PUBLIC_SITE_URL=https://morche.ir
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL} NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ---- runtime ------------------------------------------------------------------
FROM node:${NODE_VERSION}-slim
LABEL org.opencontainers.image.source=https://github.com/morcheh-cloud/website \
      org.opencontainers.image.title="Morche website" \
      org.opencontainers.image.description="Marketing site and docs for Morche"
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3300 HOSTNAME=0.0.0.0
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
# Tutorials are read from here if a page is ever rendered on demand.
COPY --from=build --chown=node:node /app/content.db ./content.db
USER node
EXPOSE 3300
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+process.env.PORT+'/robots.txt').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"
CMD ["node", "server.js"]
