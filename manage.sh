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

setup-prod() {
    clean
    docker-compose run --rm dev npm install --production
}

testinspect() {
    rm -rf dist/
    docker-compose run --rm dev npm run testinspect
}

timeouter() {
    docker-compose run --rm timeouter npm run build
    docker-compose stop timeouter || true
    docker-compose rm timeouter || true
    docker-compose up -d timeouter
}

test() {
    rm -rf dist/
    docker-compose run --rm dev npm test
}

build() {
    rm -rf dist/
    docker-compose run --rm dev npm run package
}

migrate() {
    docker-compose run --rm dev npm run build
    docker-compose run --rm dev typeorm migration:run
}

generate-migrations() {
    if [ "$1" == "" ]; then
        echo "Supply a base migration name, eg ./manage.sh generate-migrations AddFields"
        exit 1
    fi
    docker-compose run --rm dev npm run build
    docker-compose run --rm dev typeorm migration:generate -n $1
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

qaa() {
    if [ -z "$1" ]; then
        docker-compose run --rm qaa npm run qaa
    else
        docker-compose run --rm qaa npm run qaa -- --tags=@$1
    fi
}

$@
