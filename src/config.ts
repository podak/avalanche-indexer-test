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

    BLOCKS_SIZE: 10000
};

// Pull overrides from environment variables
overwriteFromEnv(config);
