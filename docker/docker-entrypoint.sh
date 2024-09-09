#!/bin/sh

find /app -iname '*.html' -print0 > /tmp/rename_files
printenv | grep ^PREZ_ | while read APP_ENV_VAR; do
  # Extract variable name and enclose in "__"
  VAR_NAME="__${APP_ENV_VAR%%=*}__"
  # Extract varaible value
  VAR_VALUE="${APP_ENV_VAR#*=}"
  # Escape @ in value
  VAR_VALUE="$(echo "${VAR_VALUE}" | sed -r "s/@/\\\@/g")"
  # Replace occurrences in files
  echo "Replacing ${VAR_NAME} with ${VAR_VALUE}"
  xargs -0 -a /tmp/rename_files sed -r "s@${VAR_NAME}@${VAR_VALUE}@g" -i
done

#sed -r 's@<base[^>]+>@@' -i /app/index.html
#sed -r "s@<head>@<head><base href=\"${APP_SERVE_PATH}\">@" -i /app/index.html

envsubst '${APP_SERVE_PATH}' < /etc/nginx/nginx.conf.tpl > /etc/nginx/nginx.conf
rm -rf /usr/share/nginx/html/*
mkdir -p /usr/share/nginx/html${APP_SERVE_PATH}
cp -R /app/* /usr/share/nginx/html${APP_SERVE_PATH}

echo "nginx running on port 8080"

exec "$@"