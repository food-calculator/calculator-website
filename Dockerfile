FROM nginx:alpine
LABEL authors="Fridolin42"
EXPOSE 80

COPY ./dist /usr/share/nginx/html

CMD ["echo", "\"\"", ">", "/usr/share/nginx/html/dist/config.json"]

CMD ["nginx", "-g", "daemon off;"]
