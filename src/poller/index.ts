import {logger} from '../logger';
import {
    RetryableError
} from '../errors';
import {config} from '../config';
import { 
    getLastBlockNumber,
    getBlockByNumber 
} from '../services/avalanche';

export async function main(): Promise<void> {

    logger.info('Avalanche indexer poller started.');
    while (true) {
        try {
            await process();
        } catch(e) {
            logger.error('An error raised during the execution:', {error: e});
        }
    }
}

export async function process(): Promise<void> {
    const blockNumber = await getLastBlockNumber();
    await getBlockByNumber(blockNumber);
    // get current block number from node
    // check initialization flag in cache
    // if true, start initialization procedure
        // download last 10000 blocks asap
            // batch of requests in parallel? (Promise all)
        // send every block info to queue
        // set initialization flag to false
    // else, download only latest block 
        // download block by number
        // send block info to queue
    // see how much time is left before next cycle
    // sleep remaining time
}

