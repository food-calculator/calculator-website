FROM nginx:alpine
LABEL authors="Fridolin42"
EXPOSE 80

COPY ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]