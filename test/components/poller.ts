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

    it('1 block is stored in DB, 1 is in download, poller should instantiate other ${config.MAX_BLOCK_PER_CYCLE} downloads in the queue and in the download collection of the DB', async () => {
        const lastBlock = 20000;
        // setup DB
        const dbBlock = dbBlockFixture({
            number: lastBlock - 1
        });

        const dbDownload = dbDownloadFixture({
            blockNumber: lastBlock
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
        
        // there should be stored the previous download + the config.MAX_BLOCK_PER_CYCLE new ones
        expect(storedDownloads.length).to.equal(config.MAX_BLOCK_PER_CYCLE + 1);
        expect(storedDownloads[1]).to.deep.include({
            blockNumber: lastBlock - 2
        });
        expect(storedDownloads[storedDownloads.length - 1]).to.deep.include({
            blockNumber: lastBlock - config.MAX_BLOCK_PER_CYCLE - 1
        });

        expect(queuedDownloads.length).to.equal(config.MAX_BLOCK_PER_CYCLE);
        expect(queuedDownloads[0]).to.deep.include({
            blockNumber: lastBlock - 2
        });
        expect(queuedDownloads[queuedDownloads.length - 1]).to.deep.include({
            blockNumber: lastBlock - config.MAX_BLOCK_PER_CYCLE - 1
        });
    });
});
