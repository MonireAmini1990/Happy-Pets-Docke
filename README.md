ستور ساخت شبکه:
docker network create pet-network

اطمینان از اینکه شبکه ساخته شده است:
docker network ls

دستور ساخت volume:
docker volume create pet-db-data

اطمینان از اینکه ساخته شده است:
docker volume ls

ساخت فایل front و قرار دادن کد زیر در index.html:
<!DOCTYPE html>
<html>
<head>
  <title>Happy Pets</title>
  <style>
    body {
      background-image: url("https://blog.tryfi.com/content/images/2024/03/happy-dog-yellow-flowers.webp");
      background-size: cover; 
      color: rgba(161, 108, 0, 0.853);
    }
  </style>
</head>
<body>
  <h1>Welcome to Happy Pets!</h1>
  <p>Learn how to take care of your pets.</p>
</body>
</html>

ساخت فایل بک اندو  فایل app.js و قرار دادن کد زیر در آن:
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Happy Pets!' });
});

app.listen(3000, () => console.log('Backend running on port 3000'));

ساخت فایل Dockerfile برای backend
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]

فایل package.json برای backend:
init -y

وشتن فایل docker-compose.yml:
version: '3.8'

services:
  frontend:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./frontend:/usr/share/nginx/html:ro
    networks:
      - pet-network
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "3000:3000"
    networks:
      - pet-network
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: pet_tips
    volumes:
      - pet-db-data:/var/lib/mysql
    networks:
      - pet-network

volumes:
  pet-db-data:

networks:
  pet-network:

ران کردن برنامه:
docker-compose up

برای گرفتن اسکرین شاتها:

فرانت‌اند را در مرورگر باز کردم:
http://localhost:8080

بک اند را در مرورگر باز کردم:
http://localhost:3000

برای استاپ کردن کانتینرها:
docker-compose down


