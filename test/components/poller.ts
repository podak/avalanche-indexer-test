import nock from 'nock';
import { expect } from 'chai';
import { process } from '../../src/poller';
import {
    db,
    setupDownloads,
    cleanDownloads,
    setupBlocks,
    cleanBlocks,
    dbBlockFixture,
    dbDownloadFixture
} from '../fixtures/db';
import {
    mockAvalancheNode,
    blockByNumberResponseFixture,
    lastBlockResponseFixture
} from '../fixtures/avalance';
import { config } from '../../src/config';

describe('Poller testing', () => {

    beforeEach(async () => {
        nock.cleanAll();
        await db.connect();
    });

    afterEach(async () => {
        await cleanDownloads();
        await cleanBlocks();
        await db.disconnect();
    });

    it('1 block is stored in DB, 1 is in download, poller should instantiate other 9998 downloads in the queue and in the download collection of the DB', async () => {
        const lastBlock = 20000;
        // setup DB
        const dbBlock = dbBlockFixture({
            number: lastBlock - config.BLOCKS_SIZE
        });

        const dbDownload = dbDownloadFixture({
            blockNumber: lastBlock - config.BLOCKS_SIZE + 1
        });

        await setupDownloads([dbDownload]);
        await setupBlocks([dbBlock]);

        //setup avalanche node responses
        mockAvalancheNode(false, 200, lastBlockResponseFixture({
            result: '0x' + (lastBlock).toString(16)
        }));
        mockAvalancheNode(false, 200, blockByNumberResponseFixture({
            result: {
                ... blockByNumberResponseFixture().result,
                number: '0x' + (lastBlock).toString(16)
            }
        }));

        await process();
    });
});
