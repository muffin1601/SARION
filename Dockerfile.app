# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/marketing/package.json ./apps/marketing/package.json
COPY apps/app/package.json ./apps/app/package.json
RUN npm ci

FROM base AS builder
# Server-only values below are harmless build placeholders. Supply the real
# credentials only to the running container through its secret manager.
ARG NEXT_PUBLIC_MARKETING_URL=https://trysarion.com
ARG NEXT_PUBLIC_APP_URL=https://app.trysarion.com
ARG NEXT_PUBLIC_AHREFS_KEY
ARG NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL
ENV NEXT_PUBLIC_MARKETING_URL=$NEXT_PUBLIC_MARKETING_URL \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_AHREFS_KEY=$NEXT_PUBLIC_AHREFS_KEY \
    NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL=$NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL \
    DATABASE_URL=postgresql://build:build@localhost:5432/build \
    DIRECT_URL=postgresql://build:build@localhost:5432/build \
    BETTER_AUTH_SECRET=build-only-placeholder-secret-not-for-runtime
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node scripts/generate-workspace-routes.mjs && npm run build:app

FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=builder /app/apps/app/public ./apps/app/public
COPY --from=builder /app/apps/app/.next/standalone ./
COPY --from=builder /app/apps/app/.next/static ./apps/app/.next/static
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "apps/app/server.js"]
