# avalanche-indexer-test
Minimal local indexer for the avalanche blockchain. This is part of a test assignement

## Architecture
The general architecture of the application is represented by the schema below:
![architectural diagram](/design/indexer-design.png "architectural diagram")

I decided to design the system as a microservices application. There are in total 5 components:
- The node poller is responsable to retrieve the newest blocks every second. At every cycle, it checks what is the latest block number from the blockchain node, compares it to the blocks that have been stored in the DB, find the missing blocks in the list and schedule their download posting a series of messages in the Download queue.
When the application is executed for the first time, it schedule the download of all the 10000 blocks.
- The block downloader receives the download orders inserted in the queue, downloads the related blocks from the node and propagate its elements to the Update queues.
- The updater is the component that process and store all the information retrieved from the node in the DB. It can be further decomposed in 3 parts:
    - The transactions updater stores all the transaction of the processed block in the database as they are (for future application it can be used to infer other transaction-related metrics)
    - The block updater is also storing the block information in the DB as they are
    - The address updater updates the balance of all the addresses that partecipated in the transactions of the block. It also update a local list with the hash of all the transactions received or sent by every address. This information are stored in the DB under the address collection
- The cleaner (data consistency worker) is executed every 2 minutes to remove all the old data (older than 10000 blocks) from the DB
- The api provides access to a subset of the information stored in the DB. As requested in the assignement, I implemented the following endpoints:
    - GET http://localhost:8080/ping can be useful to test if the api is live
    - GET http://localhost:8080/blockNTransactionIndexSortedTransactions returns the list of transactions sent or received from a specific address, ordered by blockNumber and transactionIndex. It accepts the following parameters
    ```
    {
        "address": "0x0000000000000000000000000",
        "type": "received" | "sent"
    }
    ```
    - GET http://localhost:8080/addressNumberTransactions returns the number of transactions sent or received by an address
    ```
    {
        "address": "0x0000000000000000000000000",
        "type": "received" | "sent"
    }
    ```
    - GET http://localhost:8080/transactionsByValue returns a list of transactions ordered by value
    - GET http://localhost:8080/top100BalanceAddresses returns a list of the richest 100 address that sent or received a transaction

The api has been implemented using the Fastify library

I used a rabbitMQ server to serve the queues that enabled the communication between the components


## Commands to run the application
### Installation (only for the first execution)
```
// install all the packages
./manage.sh setup

// build the typescript code
./manage.sh build
```

### Execution
```
// you can add a -d as last parameter to run all the containers silently
docker-compose up

// to stop the application:
docker-compose down
```

## Known issues & room for improvements
- Unit tests for downloader has been disabled because corrupt the ones of the updater component. They need to be fixed
- Unit test set should be increased to meet the coverage minimum requirements
- Would be better to add the pagination to the api responses