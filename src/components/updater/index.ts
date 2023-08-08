import {logger} from '../../logger';
import {config} from '../../config';
import { 
    getAddressBalance
} from '../../services/avalanche';
import { RabbitMQWriter } from '../../services/rabbitmq-writer';
import { RabbitMQReader } from '../../services/rabbitmq-reader';
import { AddressModel } from '../../schema/address';
import { TransactionModel } from '../../schema/transaction';
import { BlockModel } from '../../schema/block';
import { 
    QueueRouteKeys,
    TransactionQueue,
    AddressQueue,
    BlockQueue
} from '../../types';
import { DBClient } from '../../services/db';

let rabbitTransaction: RabbitMQReader<TransactionQueue>;
let rabbitAddress: RabbitMQReader<AddressQueue>;
let rabbitBlock: RabbitMQReader<BlockQueue>;
const db: DBClient = new DBClient();

export async function start(): Promise<void> {
    logger.info('Avalanche indexer updater started.');

    await db.connect();

    await initializeQueue<TransactionQueue>(
        rabbitTransaction,
        TransactionModel,
        config.UPDATE_TRANSACTION_QUEUE_NAME,
        processTransaction
    );

    await initializeQueue<BlockQueue>(
        rabbitBlock,
        BlockModel,
        config.UPDATE_BLOCK_QUEUE_NAME,
        processBlock
    );

    await initializeQueue<AddressQueue>(
        rabbitAddress,
        AddressModel,
        config.UPDATE_ADDRESS_QUEUE_NAME,
        processAddress
    );
}

async function initializeQueue<T>(
    reader: RabbitMQReader<T>,
    model: object,
    queueName: string,
    handler: (data: T, db: DBClient) => Promise<void>
): Promise<void> {
    reader = new RabbitMQReader<T>(model);
    await reader.connectWithConfig();

    reader.onMessages(queueName, async (message: T) => {
        try {
            await handler(message, db);
        } catch(e) {
            console.log(e);
            logger.error('An error raised during the processing of the message:', {error: e});
        }
    });

}

export async function stop() {
    try {
        rabbitTransaction.disconnect();
        rabbitBlock.disconnect();
        rabbitAddress.disconnect();
        await db.disconnect();
    } catch (e) {
        logger.info('There was an error during the stop.');
    }
    logger.info('Avalanche indexer uploader stopped.');
}

/*
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
}*/

async function processTransaction(transaction: TransactionQueue): Promise<void> {
    logger.info('Updating a transaction.', {hash: transaction.hash});
    await db.transactions.create(transaction);
}

async function processBlock(block: BlockQueue): Promise<void> {
    logger.info('Updating a block.', {hash: block.hash});
    await db.blocks.create(block);
}

async function processAddress(address: AddressQueue): Promise<void> {
    logger.info('Updating an address.', {address: address.hash});

    const balance = await getAddressBalance(address.hash);

    const stored = await db.addresses.find({hash: address.hash});
    if (stored.length === 0) {
        logger.info('Creating new address item in the DB.', {hash: address.hash});
        await db.addresses.create({
            hash: address.hash,
            balance,
            sentTx: address.newSentTx,
            receivedTx: address.newReceivedTx
        })
    } else {
        logger.info('Updating address info from the DB.', {hash: address.hash});
        await db.addresses.findOneAndUpdate({hash: address.hash}, {
            balance,
            sentTx: [...address.newSentTx, ...stored[0].sentTx],
            receivedTx: [...address.newReceivedTx, ...stored[0].receivedTx]
        });
    }
}

