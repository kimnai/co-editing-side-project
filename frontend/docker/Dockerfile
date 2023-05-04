FROM mhart/alpine-node:16 as base

FROM base as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci && \ 
    echo "Copy package information"

FROM build as last
COPY ./ ./
ENV BACKEND_HTTP_ADDRESS=http://co-editing_backend:8080
ENV API_ENDPOINT="/backend"
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID="456571813861-77cc4avdv2a5gf0hib3vulsd0joauhuq.apps.googleusercontent.com"

RUN npm run build && \
    echo "Build finish"
