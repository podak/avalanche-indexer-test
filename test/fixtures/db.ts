import {DBClient} from '../../src/services/db';
import {config} from '../../src/config';
import { AddressDB, BlockDB, AvalancheTx, DownloadDB } from '../../src/types';
import { hash } from '../../src/utils'

export const db = new DBClient();

export async function setupAddresses(address: Partial<AddressDB>[]) {
    await db.addresses.insertMany(address);
}

export async function setupBlocks(blocks: Partial<BlockDB>[]) {
    await db.blocks.insertMany(blocks);
}

export async function setupTransactions(transactions: Partial<AvalancheTx>[]) {
    await db.blocks.insertMany(transactions);
}

export async function setupDownloads(downloads: Partial<DownloadDB>[]) {
    await db.blocks.insertMany(downloads);
}

export async function cleanAddresses() {
    await db.addresses.deleteMany({});
}

export async function cleanBlocks() {
    await db.blocks.deleteMany({});
}

export async function cleanTransactions() {
    await db.transactions.deleteMany({});
}
export async function cleanDownloads() {
    await db.downloads.deleteMany({});
}

export function dbAddressFixture(
    nonDefaultProps: Partial<AddressDB> = {}):
    AddressDB {
    const defaults: AddressDB = {
        hash: randomHash(),
        balance: 10000,
        sentTx: [randomHash()],
        receivedTx: [randomHash()]
    };

    return {...defaults, ...nonDefaultProps};
}

export function dbDownloadFixture(
    nonDefaultProps: Partial<DownloadDB> = {}):
    DownloadDB {
    const defaults: DownloadDB = {
        blockNumber:randomBlockNumber(),
        dttm: new Date()
    };

    return {...defaults, ...nonDefaultProps};
}

export function dbBlockFixture(
    nonDefaultProps: Partial<BlockDB> = {}):
    BlockDB {
    const defaults: BlockDB = {
        hash: randomHash(),
        baseFeePerGas: 1,
        difficulty: 1,
        gasLimit: 1,
        gasUsed: 1,
        logsBloom: '',
        miner: randomHash(),
        mixHash: '',
        nonce: '',
        number: randomBlockNumber(),
        parentHash: randomHash(),
        receiptsRoot: randomHash(),
        size: 100,
        stateRoot: randomHash(),
        timestamp: (new Date()).toISOString(),
        totalDifficulty: 100,
        transactions: [randomHash()],
        transactionsRoot: randomHash()
    };

    return {...defaults, ...nonDefaultProps};
}

export function dbTransactionFixture(
    nonDefaultProps: Partial<AvalancheTx> = {}):
    AvalancheTx {
    const defaults: AvalancheTx = {
        hash: randomHash(),
        blockHash: randomHash(),
        blockNumber: randomBlockNumber(),
        from: randomHash(),
        gas: 100,
        gasPrice: 100,
        maxFeePerGas: 100,
        maxPriorityFeePerGase: 100,
        input: '',
        nonce: 0,
        to: randomHash(),
        transactionIndex: 0,
        value: 1000,
        type: '',
        accessList: [],
        chainId: 0,
        v: 'v',
        r: 'r',
        s: 's'
    };

    return {...defaults, ...nonDefaultProps};
}

function randomHash() {
    return hash(Math.random() + '-seed');
}

function randomBlockNumber() {
    return Math.floor(Math.random() * 100000);
}
