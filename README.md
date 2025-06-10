# Food Calculator Website

Requires the API server

➡ <a href="https://github.com/food-calculator/calculator-server">Github Repository</a>

### Run with docker:

1.)
```shell
echo '{"API": "https://DOMAIN.IO/api"}' >> /FOLDER/config.json
```

2.)
```shell
docker run -d \
--name calc-website
-v /FOLDER/config.json:/usr/share/nginx/html/dist/config.json \
--restart unless-stoped \
--network NETWORK_NAME
fridolin1/food-calculator-server:latest
```