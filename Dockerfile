FROM node:lts-alpine AS builder

ENV PATH /app/node_modules/.bin:$PATH
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

RUN cp /ogc-prez-ui/docker/prez-ui-env .env.local && \
    pnpm i && \
    pnpm dotenv -e .env.local -e .env -- nuxi generate

FROM nginx:alpine as prod

ENV PREZ_API_ENDPOINT http://localhost:45081
ENV PREZ_APP_TITLE "OGC RAINBOW"
ENV APP_SERVE_PATH /

WORKDIR /

COPY docker/nginx.conf.tpl /etc/nginx/nginx.conf.tpl
COPY --from=builder /prez-ui/packages/core/.output/public /app
COPY docker/docker-entrypoint.sh /

EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
