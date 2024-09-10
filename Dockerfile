FROM node:lts-alpine AS builder

ENV PATH /app/node_modules/.bin:$PATH
ENV PREZ_CORE_EXTENDS=/ogc-prez-ui
ARG PREZ_UI_BASE="https://github.com/RDFLib/prez-ui.git"
ARG PREZ_UI_BASE_BRANCH="hjohns/next/alpha"

RUN apk update && apk add git && npm i -g pnpm && \
    git clone -b "${PREZ_UI_BASE_BRANCH}" "${PREZ_UI_BASE}" /prez-ui

WORKDIR /prez-ui

RUN pnpm i

COPY . /ogc-prez-ui/

WORKDIR /ogc-prez-ui/

RUN pnpm i

WORKDIR /prez-ui/packages/core

RUN pnpm i && \
    pnpm dotenv -e .env -- nuxi build

FROM node:lts-alpine as prod

ENV NUXT_PUBLIC_PREZ_API_ENDPOINT http://localhost:45081
ENV NUXT_PUBLIC_APP_TITLE "OGC RAINBOW"
ENV NUXT_APP_BASE_URL /
ENV NITRO_PORT 8080

WORKDIR /app

COPY --from=builder /prez-ui/packages/core/.output /app

EXPOSE 8080
CMD ["/app/server/index.mjs"]