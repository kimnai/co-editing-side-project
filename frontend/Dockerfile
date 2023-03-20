FROM mhart/alpine-node:16

WORKDIR /app

COPY frontend/package.json ./

RUN npm i 

COPY frontend/ ./

RUN npm run dev
