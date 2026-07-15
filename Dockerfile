FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy the built application
COPY --from=builder /app/dist ./dist
# Copy production dependencies (actually we'll reinstall for prod or copy node_modules)
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --prod

USER expressjs

EXPOSE 5000
ENV PORT 5000

CMD ["node", "./dist/server.js"]
