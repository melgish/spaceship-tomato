FROM node:20-alpine AS base
WORKDIR /app


FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci --ignore-scripts --only-production

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV  NEXT_TELEMMETRY_DISABLED=1 \
  PORT=3000

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder --chmod=755 /app/docker-entrypoint.sh ./

CMD ./docker-entrypoint.sh
