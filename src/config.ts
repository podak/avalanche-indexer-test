import { overwriteFromEnv } from './utils';

export const config = {
    AVALANCHE_NODE_URL: 'https://api.avax.network', 
    AVALANCHE_NODE_PORT: 443, 
    AVALANCHE_NODE_PROTOCOL: 'https',
    AVALANCHE_NETWORK_ID: 1,

    DB_URL: 'db',
    DB_USER: 'indexer-mongo',
    DB_PASS: 'indexer-mongo',
    DB_NAME: 'indexer-mongo',

    RABBITMQ_PROTOCOL: 'amqp',
    RABBITMQ_URL: 'rabbit',
    RABBITMQ_PORT: 5672,
    RABBITMQ_USER: 'indexer',
    RABBITMQ_PASSWORD: 'indexer',
    RABBITMQ_VHOST: '/AVAX',

    UPDATE_EXCHANGE_NAME: 'Update',
    DOWNLOAD_EXCHANGE_NAME: 'Download',
    UPDATE_ADDRESS_QUEUE_NAME: 'Update.Address.Queue',
    UPDATE_BLOCK_QUEUE_NAME: 'Update.Block.Queue',
    UPDATE_TRANSACTION_QUEUE_NAME: 'Update.Transaction.Queue',
    DOWNLOAD_QUEUE_NAME: 'Download.Queue',

    BLOCKS_SIZE: 10000,
    POLLER_PERIOD_MS: 1000,
    DATA_CONSINSTENCY_PERIOD_MS: 2000
};

// Pull overrides from environment variables
overwriteFromEnv(config);
