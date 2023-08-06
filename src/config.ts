import { overwriteFromEnv } from './utils';

export const config = {
    AVALANCHE_NODE_URL: 'https://api.avax.network', 
    AVALANCHE_NODE_PORT: 443, 
    AVALANCHE_NODE_PROTOCOL: 'https',
    AVALANCHE_NETWORK_ID: 1
};

// Pull overrides from environment variables
overwriteFromEnv(config);
