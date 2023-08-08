#!/bin/bash
set -e

touch .env

clean() {
    rm -rf dist/ node_modules/
}

setup() {
    clean
    docker-compose run --rm dev npm install
}

test() {
    rm -rf dist/
    docker-compose run --rm dev npm test
}

build() {
    rm -rf dist/
    docker-compose run --rm dev npm run build
}

init-db() {
    docker-compose stop db || true
    docker-compose rm db || true
    docker-compose up -d db
    migrate
}

init-rabbit() {
    docker-compose stop rabbit || true
    docker-compose rm rabbit || true
    docker-compose up rabbit
}

init-poller() {
    docker-compose stop poller || true
    docker-compose rm poller || true
    docker-compose up poller
}

init-cleaner() {
    docker-compose stop cleaner || true
    docker-compose rm cleaner || true
    docker-compose up cleaner
}

init-downloader() {
    docker-compose stop downloader || true
    docker-compose rm downloader || true
    docker-compose up downloader
}

init-updater() {
    docker-compose stop updater || true
    docker-compose rm updater || true
    docker-compose up updater
}

$@
