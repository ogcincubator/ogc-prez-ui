#!/bin/bash

find /app -type f -print0 > /tmp/rename_files

for V in NUXT_PUBLIC_PREZ_API_ENDPOINT NUXT_PUBLIC_APP_TITLE ; do
  xargs -0 -a /tmp/rename_files sed -i -r "s;@@${V}@@;${!V};g"
done

rm -rf /usr/share/nginx/html/*
mkdir -p /usr/share/nginx/html"${APP_SERVE_PATH}"
cp -R /app/* /usr/share/nginx/html"${APP_SERVE_PATH}"

envsubst '${NUXT_APP_BASE_URL}' < /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf
echo "nginx running on port 8080"

exec "$@"