import nock from 'nock';
import { expect } from 'chai';
import { process } from '../../src/components/poller';
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
import {
    DownloadModel
} from '../../src/schema/download';
import {
    DownloadQueue
} from '../../src/types';
import {
    monitorQueue
} from '../fixtures/rabbit-mq';
import { config } from '../../src/config';

describe('Poller testing', () => {

    beforeEach(async () => {
        nock.cleanAll();
    });

    afterEach(async () => {
        await db.connect();
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
            blockNumber: lastBlock + 1 - config.BLOCKS_SIZE
        });

        await db.connect();
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

        // listen to messages published in the rabbit download queue
        const queue = await monitorQueue<DownloadQueue> (config.DOWNLOAD_QUEUE_NAME, DownloadModel);

        await process();

        // need to reconnect to db because db.disconnect called inside process
        // kills all active connections
        await db.connect();
        const storedDownloads = await db.downloads.find();
        const queuedDownloads = queue.getMessages();
        queue.done();
        // we should be downloading 10000 blocks - the 2 already downloaded/initiated
        // stored downloads should be 9999 (9998 + previous stored one)
        expect(storedDownloads.length).to.equal(9999);
        expect(storedDownloads[1]).to.deep.include({
            blockNumber: lastBlock - config.BLOCKS_SIZE + 2
        });
        // queued downloads should be 9998
        expect(queuedDownloads.length).to.equal(9998);
        expect(queuedDownloads[0]).to.deep.include({
            blockNumber: lastBlock - config.BLOCKS_SIZE + 2
        });
    });
});
