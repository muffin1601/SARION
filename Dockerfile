# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app

# --- deps ---
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# --- build ---
FROM base AS builder
# NEXT_PUBLIC_* vars are inlined into the client bundle at build time, so they
# must be present HERE (not at container runtime). Pass via --build-arg.
ARG NEXT_PUBLIC_AHREFS_KEY
ENV NEXT_PUBLIC_AHREFS_KEY=${NEXT_PUBLIC_AHREFS_KEY}
ARG NEXT_PUBLIC_APP_URL=https://trysarion.com
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ARG NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL
ENV NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL=${NEXT_PUBLIC_MASTERY_KIT_CHECKOUT_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate && npm run build

# --- runner ---
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
