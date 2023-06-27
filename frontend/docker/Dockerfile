FROM mhart/alpine-node:16 as base

FROM base as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci && \ 
    echo "Copy package information"

FROM build as last
COPY ./ ./
RUN npm run build:dev && \
    echo "Build finish"
