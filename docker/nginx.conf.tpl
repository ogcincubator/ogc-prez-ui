worker_processes 4;

events { worker_connections 1024; }

http {
    server {
        listen 8080;
        root  /usr/share/nginx/html;
        include /etc/nginx/mime.types;

        location ${NUXT_APP_BASE_URL} {
            try_files $uri ${NUXT_APP_BASE_URL}index.html;
        }
    }
}