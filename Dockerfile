FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

# Production
# react-router 사용할때 path로 바로입력하고 들어갈때 404 에러가 발생하는 문제 해결
# https://patrickjamesoneill.medium.com/404-not-found-with-docker-react-router-and-nginx-21fdce02c5
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY .docker/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]