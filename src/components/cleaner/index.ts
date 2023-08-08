import {logger} from '../../logger';
import {config} from '../../config';
import { 
    getLastBlockNumber 
} from '../../services/avalanche';
import { DBClient } from '../../services/db';

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
    const startDttm = Date.now();
    const db = new DBClient();
    await db.connect();

    const blockNumber = await getLastBlockNumber();
    const oldestBlock = blockNumber - config.BLOCKS_SIZE;

    const expiredBlocks = await db.blocks.find({number: {$lt: oldestBlock}});
    
    logger.info('Removing old blocks', {count: expiredBlocks.length, hashes: expiredBlocks});
    for (const block of expiredBlocks) {
        const txToDelete = block.transactions.map((t) => (t.hash));
        logger.info('Removing related transactions', {count: txToDelete.length, hashes: txToDelete});
        await db.transactions.deleteMany({hash: {$in: txToDelete}});
        // TODO - remove transaction hash also from addresses
        await db.blocks.deleteOne({hash: block.hash});
    }

    await db.disconnect();
    
    const endDttm = Date.now();
    const timeDelta = endDttm - startDttm;
    if (timeDelta < config.CLEANER_PERIOD_MS) {
        logger.info('Cleaner will sleep before next cycle', {sleepMs: timeDelta});
        await new Promise(r => setTimeout(r, config.CLEANER_PERIOD_MS));
    } else {
        logger.warning('Cleaner has taken more than expected. Next cycle will start immediately', {durationMs: timeDelta});
    }
}


