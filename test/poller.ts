import nock from 'nock';
import { expect } from 'chai';
import { process } from '../src/poller';
import { config } from '../src/config';

describe('Poller testing', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    it('First test', async () => {
        await process();
    });
});
