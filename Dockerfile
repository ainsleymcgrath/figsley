FROM node:lts-alpine3.17 AS builder
WORKDIR /usr/local/web
COPY . .
RUN npm install
RUN npm run build

FROM node:lts-alpine3.17
WORKDIR /usr/local/web
COPY --from=builder /usr/local/web/build ./build
RUN npm install --global http-server@14.1.1
EXPOSE 8080
CMD ["http-server", "-p", "8080", "./build"]
