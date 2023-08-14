import nock from 'nock';
import { expect } from 'chai';
import { process } from '../../src/components/cleaner';
import {
    db,
    setupBlocks,
    cleanBlocks,
    dbBlockFixture,
    setupTransactions,
    cleanTransactions,
    dbTransactionFixture
} from '../fixtures/db';
import {
    mockAvalancheNode,
    lastBlockResponseFixture
} from '../fixtures/avalance';

describe('Cleaner testing', () => {

    beforeEach(async () => {
        nock.cleanAll();
    });

    afterEach(async () => {
        await db.connect();
        await cleanTransactions();
        await cleanBlocks();
        await db.disconnect();
    });

    it('1 old block is stored in DB, it contained 1 transaction, they should both be cleaned from the DB', async () => {
        const lastBlock = 20000;
        const oldBlock = 10
        // setup DB
        const dbTransaction = dbTransactionFixture({
            hash: 'test'
        });
        const dbBlock = dbBlockFixture({
            number: oldBlock,
            transactions: [dbTransaction]
        });

        await db.connect();
        await setupBlocks([dbBlock]);
        await setupTransactions([dbTransaction]);

        //setup avalanche node responses
        mockAvalancheNode(false, 200, lastBlockResponseFixture({
            result: '0x' + (lastBlock).toString(16)
        }));

        await process();

        // need to reconnect to db because db.disconnect called inside process
        // kills all active connections
        await db.connect();
        const storedBlocks = await db.blocks.find();
        const storedTransactions = await db.transactions.find();

        expect(storedBlocks.length).to.equal(0);
        expect(storedTransactions.length).to.equal(0);
    });
});
