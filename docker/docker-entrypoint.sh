#!/bin/bash

: "${NUXT_APP_BASE_URL:=/}"

find /app -type f -print0 > /tmp/rename_files

for V in NUXT_PUBLIC_PREZ_API_ENDPOINT NUXT_PUBLIC_APP_TITLE ; do
  xargs -0 -a /tmp/rename_files sed -i -r "s;@@${V}@@;${!V};g"
done

xargs -0 -a /tmp/rename_files sed -i -r "s;/base-url-oqui9inohyoh2Ouqu1ooThohnaobeeSa3aiNaeP9Aiv3ochaiXaelo5oof1Noh3u;${NUXT_APP_BASE_URL%/};g"

rm -rf /usr/share/nginx/html/*
mkdir -p /usr/share/nginx/html"${NUXT_APP_BASE_URL}"
cp -R /app/* /usr/share/nginx/html"${NUXT_APP_BASE_URL}"

envsubst '${NUXT_APP_BASE_URL}' < /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf
echo "nginx running on port 8080"

exec "$@"