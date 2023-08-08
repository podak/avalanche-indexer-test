import {logger} from '../../logger';
import {config} from '../../config';
import { 
    getBlockByNumber
} from '../../services/avalanche';
import { RabbitMQWriter } from '../../services/rabbitmq-writer';
import { RabbitMQReader } from '../../services/rabbitmq-reader';
import { DownloadModel } from '../../schema/download';
import { 
    DownloadQueue,
    QueueRouteKeys,
    TransactionQueue,
    AddressQueue
} from '../../types';

let rabbit: RabbitMQReader<DownloadQueue>;

export async function start(): Promise<void> {
    logger.info('Avalanche indexer downloader started.');

    rabbit = new RabbitMQReader<DownloadQueue>(DownloadModel)
    await rabbit.connectWithConfig();

    rabbit.onMessages(config.DOWNLOAD_QUEUE_NAME, async (download: DownloadQueue) => {
        try {
            await process(download);
        } catch(e) {
            logger.error('An error raised during the execution:', {error: e});
        }
    });
}

export function stop() {
    logger.info('Avalanche indexer downloader stopped.');
    rabbit.disconnect();
}

export async function process(download: DownloadQueue): Promise<void> {
    logger.info('Processing new download.', download);
    const writer = new RabbitMQWriter();

    const block = await getBlockByNumber(download.blockNumber);
    logger.info('Block retrieved from node.', {
        hash: block.hash,
        txCount: block.transactions.length
    });

    logger.info('Sending block to updater queue.', {hash: block.hash});
    await writer.connectWithConfig();
    await writer.writeExchange(
        config.UPDATE_EXCHANGE_NAME,
        'direct',
        QueueRouteKeys.UPDATE_BLOCK,
        [block]
    );

   const transactions = block.transactions;
   logger.info('Sending transactions to updater queue.', {
        count: transactions.length,
        hashes: transactions.map((t) => (t.hash))
    });
    await writer.writeExchange(
        config.UPDATE_EXCHANGE_NAME,
        'direct',
        QueueRouteKeys.UPDATE_TRANSACTION,
        transactions
    );

    const addresses = getAddressesFromTxs(transactions);
    logger.info('Sending addresses to updater queue.', {
        count: addresses.length,
        hashes: addresses.map((a) => (a.hash))
    });
    await writer.writeExchange(
        config.UPDATE_EXCHANGE_NAME,
        'direct',
        QueueRouteKeys.UPDATE_ADDRESS,
        addresses
    );

    // wait 500 ms before disconnecting
    await new Promise(r => setTimeout(r, 500));
    writer.disconnect();
}

function getAddressesFromTxs(transactions: TransactionQueue[]): AddressQueue[] {
    const addresses: AddressQueue[] = [];
    for (const transaction of transactions) {
        const addrTo = addresses.find((add) => (add.hash === transaction.to));
        const addrFrom = addresses.find((add) => (add.hash === transaction.from));

        if (addrTo) {
            addrTo.newReceivedTx.push(transaction.hash)
        } else {
            addresses.push({
                hash: transaction.to,
                newSentTx: [],
                newReceivedTx: [transaction.hash]
            });
        }

        if (addrFrom) {
            addrFrom.newSentTx.push(transaction.hash)
        } else {
            addresses.push({
                hash: transaction.from,
                newSentTx: [transaction.hash],
                newReceivedTx: []
            });
        }
    }

    return addresses;
}

