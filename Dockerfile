FROM node:lts-alpine3.17 AS builder
WORKDIR /usr/local/web
COPY . .
RUN npm install
RUN npm run build

# FROM node:lts-alpine3.17
# WORKDIR /usr/local/web
# COPY --from=builder /usr/local/web/build ./build
# COPY --from=builder /usr/local/web/package* ./
EXPOSE 8080
ENV PORT=8080
CMD ["node", "build"]
