worker_processes 4;

events { worker_connections 1024; }

http {
    server {
        listen 8080;
        root  /usr/share/nginx/html;
        include /etc/nginx/mime.types;

        location ${APP_SERVE_PATH} {
            try_files $uri ${APP_SERVE_PATH}index.html;
        }
    }
}