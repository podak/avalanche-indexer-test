import nock from 'nock';
import { expect } from 'chai';
import { 
    start,
    stop
 } from '../../src/components/updater';
import {
    db,
    cleanBlocks,
    cleanAddresses,
    cleanTransactions,
    setupAddresses,
    dbAddressFixture
} from '../fixtures/db';
import {
    mockAvalancheNode,
    getAddressBalanceFixture
} from '../fixtures/avalance';
import { RabbitMQWriter } from '../../src/services/rabbitmq-writer';
import { config } from '../../src/config';
import { QueueRouteKeys } from '../../src/types';
import {
    queueBlockFixture,
    queueTransactionFixture,
    queuedAddressFixture
} from '../fixtures/rabbit-mq'

describe('Updater testing', () => {

    beforeEach(async () => {
        nock.cleanAll();
        await start();
    });

    afterEach(async () => {
        await db.connect();
        await cleanAddresses();
        await cleanTransactions();
        await cleanBlocks();
        await db.disconnect();
        await stop();
    });

    it('1 transaction is inserted in the update queue, it should be stored in the db', async () => {

        // inject download in exchange
        const writer = new RabbitMQWriter();
        await writer.connectWithConfig();
        const transaction = queueTransactionFixture();
        await writer.writeExchange(
            config.UPDATE_EXCHANGE_NAME,
            'direct',
            QueueRouteKeys.UPDATE_TRANSACTION,
            [transaction]
        );

        // wait 1 second
        await new Promise(r => setTimeout(r, 1000));
        writer.disconnect();

        await db.connect();
        const storedTransactions = await db.transactions.find();
        // there should be a single transaction stored
        expect(storedTransactions.length).to.equal(1);
        expect(storedTransactions[0]).to.deep.include({
            hash: transaction.hash
        });
    });

    it('1 block is inserted in the update queue, it should be stored in the db', async () => {

        // inject download in exchange
        const writer = new RabbitMQWriter();
        await writer.connectWithConfig();
        const block = queueBlockFixture();
        await writer.writeExchange(
            config.UPDATE_EXCHANGE_NAME,
            'direct',
            QueueRouteKeys.UPDATE_BLOCK,
            [block]
        );

        // wait 1 second
        await new Promise(r => setTimeout(r, 1000));
        writer.disconnect();

        await db.connect();
        const storedBlocks = await db.blocks.find();
        // there should be a single transaction stored
        expect(storedBlocks.length).to.equal(1);
        expect(storedBlocks[0]).to.deep.include({
            hash: block.hash
        });
    });

    it('1 address is inserted in the update queue, it does not exist in the db, so it gets created', async () => {
        //setup avalanche node responses
        mockAvalancheNode(false, 200, getAddressBalanceFixture());

        // inject download in exchange
        const writer = new RabbitMQWriter();
        await writer.connectWithConfig();
        const address = queuedAddressFixture();
        await writer.writeExchange(
            config.UPDATE_EXCHANGE_NAME,
            'direct',
            QueueRouteKeys.UPDATE_ADDRESS,
            [address]
        );

        // wait 1 second
        await new Promise(r => setTimeout(r, 1000));
        writer.disconnect();

        await db.connect();
        const storedAddress = await db.addresses.find();
        // there should be a single transaction stored
        expect(storedAddress.length).to.equal(1);
        expect(storedAddress[0]).to.deep.include({
            hash: address.hash
        });
    });

    it('1 address is inserted in the update queue, it does exist in the db, so it gets updated', async () => {
        //setup avalanche node responses
        mockAvalancheNode(false, 200, getAddressBalanceFixture());

        //setup db
        const addressDb = dbAddressFixture();
        await db.connect();
        await setupAddresses([addressDb]);

        // inject download in exchange
        const writer = new RabbitMQWriter();
        await writer.connectWithConfig();
        const address = queuedAddressFixture({
            hash: addressDb.hash
        });
        await writer.writeExchange(
            config.UPDATE_EXCHANGE_NAME,
            'direct',
            QueueRouteKeys.UPDATE_ADDRESS,
            [address]
        );

        // wait 1 second
        await new Promise(r => setTimeout(r, 1000));
        writer.disconnect();

        await db.connect();
        const storedAddress = await db.addresses.find();
        // there should be a single transaction stored
        expect(storedAddress.length).to.equal(1);
    });
});
