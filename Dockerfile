# Install dependencies only when needed
FROM --platform=linux/amd64 node:16-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed for alpine.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM --platform=linux/amd64 node:16-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Pass env file (next build by default uses .env.production.local, we need to subtitute it in build time)
ARG BUILD_ENV_FILE
ADD ${BUILD_ENV_FILE} .env.production.local

RUN yarn build

# Production image, copy all the files and run next
FROM --platform=linux/amd64 node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src/data /app/src/data

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]