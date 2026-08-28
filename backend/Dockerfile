# ---------------------------------------------------
# Stage 1: Base image
# ---------------------------------------------------
FROM node:20-alpine AS base

# ---------------------------------------------------
# Stage 2: Install production dependencies
# ---------------------------------------------------
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production && npm cache clean --force

# ---------------------------------------------------
# Stage 3: Production runner
# ---------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 expressjs

COPY --from=deps /app/node_modules ./node_modules
COPY --chown=expressjs:nodejs . .

USER expressjs

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/health || exit 1

CMD ["node", "main.js"]
