FROM node:lts-alpine AS builder
LABEL authors="avillar@ogc.org,mjahn@ogc.org"
LABEL org.opencontainers.image.authors="avillar@ogc.org,mjahn@ogc.org"

ARG NUXT_PUBLIC_PREZ_API_ENDPOINT=@@NUXT_PUBLIC_PREZ_API_ENDPOINT@@
ARG NUXT_PUBLIC_APP_TITLE=@@NUXT_PUBLIC_APP_TITLE@@
ARG NUXT_APP_BASE_URL=/
ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN nuxi generate

FROM nginx:stable-alpine AS prod

ENV NUXT_PUBLIC_PREZ_API_ENDPOINT=http://localhost:45081
ENV NUXT_PUBLIC_APP_TITLE="OGC RAINBOW"
ENV NUXT_APP_BASE_URL=/

RUN apk update && apk add bash

COPY --from=builder /app/dist /app

WORKDIR /
COPY docker/docker-entrypoint.sh /docker-entrypoint.sh
COPY docker/nginx.conf.tpl /etc/nginx/nginx.conf.tpl

EXPOSE 8080
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
