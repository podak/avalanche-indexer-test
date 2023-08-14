import {logger} from '../../logger';
import {config} from '../../config';
import { 
    getLastBlockNumber 
} from '../../services/avalanche';
import { DBClient } from '../../services/db';
import { RabbitMQWriter } from '../../services/rabbitmq-writer';
import { asyncSleep } from '../../utils';

const db = new DBClient();
const writer = new RabbitMQWriter();


export async function main(): Promise<void> {
    logger.info('Avalanche indexer poller started.');
    while (true) {
        try {
            await process();
        } catch(e) {
            logger.error('An error raised during the execution:', {error: e});
            await asyncSleep(config.POLLER_PERIOD_MS);
        }
    }
}

export async function process(): Promise<void> {
    const startDttm = Date.now();

    const blockNumber = await getLastBlockNumber();
    const oldestBlock = blockNumber - config.BLOCKS_SIZE;

    // check what are the missing blocks
    await db.connect();
    const missing = await getMissingBlocks(db, oldestBlock, config.MAX_BLOCK_PER_CYCLE);
    if (missing.length > 0) {
        logger.info('Retrieved missing blocks that need to be downloaded.', {
            n: missing.length, 
            head: missing[0],
            tail: missing[missing.length - 1]
        });

        const downloads = missing.map((blockNumber) => ({
            blockNumber,
            dttm: new Date().toISOString()
        }));

        logger.info('Writing missing blocks in the download queue.');
        await writer.connectWithConfig();
        await writer.writeExchange(config.DOWNLOAD_EXCHANGE_NAME, 'fanout', '', downloads);

        logger.info('Writing initiated downloads in the db.');
        await db.downloads.insertMany(downloads);

    } else {
        logger.info('There is no new block to download.');
    }

    await db.disconnect();
    writer.disconnect();
    
    const endDttm = Date.now();
    const timeDelta = endDttm - startDttm;
    if (timeDelta < config.POLLER_PERIOD_MS) {
        logger.info('Poller will sleep before next cycle', {sleepMs: config.POLLER_PERIOD_MS - timeDelta});
        await asyncSleep(config.POLLER_PERIOD_MS - timeDelta);
    } else {
        logger.warning('Polling has taken more than expected. Next cycle will start immediately', {durationMs: timeDelta});
    }
}

async function getMissingBlocks(
    db: DBClient,
    oldestBlock: number,
    limit: number
): Promise<number[]> {
    const blockNumbersSet =[...Array(config.BLOCKS_SIZE).keys()].map((bn) => (bn + oldestBlock));
    const storedBlocks = (await db.blocks.find({})).map((b) => (b.number));
    const blocksInProgress = (await db.downloads.find({})).map((d) => (d.blockNumber));
    return blockNumbersSet.filter((bn) => (
        !( storedBlocks.includes(bn) || blocksInProgress.includes(bn) )
    )).sort(
        // DESC sorting
        (n1, n2) => (n2 - n1)
    ).slice(0, limit);
}

