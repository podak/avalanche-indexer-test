# Select Docker image from DockerHub
FROM node:20-alpine

# Install some dependencies
RUN apk --update add curl dumb-init && \
    rm -rf /var/cache/apk/*

ENV PATH ./node_modules/.bin:$PATH

WORKDIR /app
COPY ./ ./


