import {logger} from '../logger';
import {
    RetryableError
} from '../errors';
import {config} from '../config';
import { 
    getLastBlockNumber,
    getBlockByNumber 
} from '../services/avalanche';
import { DBClient } from '../services/db';

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
    const db = new DBClient();
    await db.connect();

    const blockNumber = await getLastBlockNumber();
    const oldestBlock = blockNumber - config.BLOCKS_SIZE;

    // check what are the missing blocks
    const missing = await getMissingBlocks(db, oldestBlock);

    console.log(missing);
}

async function getMissingBlocks(
    db: DBClient,
    oldestBlock: number
): Promise<number[]> {
    const blockNumbersSet =[...Array(config.BLOCKS_SIZE).keys()].map((bn) => (bn + oldestBlock));
    const storedBlocks = (await db.blocks.find({})).map((b) => (b.number));
    const blocksInProgress = (await db.downloads.find({})).map((d) => (d.blockNumber));
    return blockNumbersSet.filter((bn) => (
        !( storedBlocks.includes(bn) || blocksInProgress.includes(bn) )
    ));
}

