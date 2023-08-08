# avalanche-indexer-test
Minimal local indexer for the avalanche blockchain. This is part of a test assignement

## Architecture
The general architecture of the application is represented by the schema below
![architectural diagram](/design/indexer-design.png "architectural diagram")

## Commands to run the application
### Installation (only for the first execution)
```
// install all the packages
./manage.sh setup

// build the components
./manage.sh build
```

### Execution
```
// you can add a -d as last parameter to run all the containers silently
docker-compose up

// to stop the application:
docker-compose down
```