import nock from 'nock';
import { expect } from 'chai';
import { start, stop } from '../../src/components/downloader';
import {
    mockAvalancheNode,
    blockByNumberResponseFixture,
} from '../fixtures/avalance';
import {
    BlockModel
} from '../../src/schema/block';
import {
    TransactionModel
} from '../../src/schema/transaction';
import {
    AddressModel
} from '../../src/schema/address';
import {
    AddressQueue,
    BlockQueue,
    DownloadQueue,
    TransactionQueue
} from '../../src/types';
import {
    monitorQueue,
    queueDownloadFixture
} from '../fixtures/rabbit-mq';
import { config } from '../../src/config';
import { RabbitMQWriter } from '../../src/services/rabbitmq-writer';

describe('Downloader testing', () => {

    beforeEach(async () => {
        nock.cleanAll();
        // launch downloader
        await start();
    });

    afterEach(async () => {
        // stop uploader
        await stop();
    });    

    // this scenario is somehow conflicting with the updater's ones
    // disabling it for now - NEED TO BE FIXED
    /*
    it('1 blockNumber is received in queue, it gets downloaded and the related messages are propagated to the updaters', async () => {
        const blockNumber = 1000;
        //setup avalanche node responses
        const blockResponse = blockByNumberResponseFixture({
            result: {
                ... blockByNumberResponseFixture().result,
                number: '0x' + (blockNumber).toString(16)
            }
        });
        mockAvalancheNode(false, 200, blockResponse);
        const block = blockResponse.result;

        // listen to messages published in the rabbit update queues
        const blockQueue = await monitorQueue<BlockQueue> (config.UPDATE_BLOCK_QUEUE_NAME, BlockModel);
        const transactionQueue = await monitorQueue<TransactionQueue> (config.UPDATE_TRANSACTION_QUEUE_NAME, TransactionModel);
        const addressQueue = await monitorQueue<AddressQueue> (config.UPDATE_ADDRESS_QUEUE_NAME, AddressModel);

        const download = queueDownloadFixture({
            blockNumber: blockNumber
        });

        // inject download in exchange
        const writer = new RabbitMQWriter();
        await writer.connectWithConfig();
        await writer.writeExchange(config.DOWNLOAD_EXCHANGE_NAME, 'fanout', '', [download]);

        // wait 1 second
        await new Promise(r => setTimeout(r, 1000));
        writer.disconnect();

        const queuedBlocks = blockQueue.getMessages();
        const queuedTransactions = transactionQueue.getMessages();
        const queuedAddress = addressQueue.getMessages();
        blockQueue.done();
        transactionQueue.done();
        addressQueue.done();

        // there should be a block in the queue
        expect(queuedBlocks.length).to.equal(1);
        expect(queuedBlocks[0]).to.deep.include({
            hash: block.hash
        });
        // there should be 1 transaction in the queue
        expect(queuedTransactions.length).to.equal(1);
        expect(queuedTransactions[0]).to.deep.include({
            hash: block.transactions[0].hash
        });
        // there should be 2 addresses in the queue
        expect(queuedAddress.length).to.equal(2);
        expect(queuedAddress[0]).to.deep.include({
            hash: block.transactions[0].to
        });
        expect(queuedAddress[1]).to.deep.include({
            hash: block.transactions[0].from
        });
    });
    */
});
