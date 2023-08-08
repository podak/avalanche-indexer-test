import { RabbitMQReader } from '../../src/services/rabbitmq-reader';
import { 
    DownloadQueue,
    TransactionQueue,
    BlockQueue,
    AddressQueue 
} from '../../src/types';
import { hash } from '../../src/utils'

export async function monitorQueue<T>(queueName: string, model: any): Promise<any> {
    const rabbit = new RabbitMQReader<T>(model);
    const messages = [];
    await rabbit.connectWithConfig();

    rabbit.onMessages(queueName, (message) => {
        messages.push(message);
    });

    return {
        done: rabbit.disconnect,
        getMessages: () => (messages)
    }
}

export function queueDownloadFixture(
    nonDefaultProps: Partial<DownloadQueue> = {}):
    DownloadQueue {
    const defaults: DownloadQueue = {
        blockNumber: randomBlockNumber(),
        dttm: new Date().toISOString()
    };

    return {...defaults, ...nonDefaultProps};
}

export function queuedAddressFixture(
    nonDefaultProps: Partial<AddressQueue> = {}):
    AddressQueue {
    const defaults: AddressQueue = {
        hash: randomHash(),
        newSentTx: [randomHash()],
        newReceivedTx: [randomHash()]
    };

    return {...defaults, ...nonDefaultProps};
}

export function queueBlockFixture(
    nonDefaultProps: Partial<BlockQueue> = {}):
    BlockQueue {
    const defaults: BlockQueue = {
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
        transactions: [queueTransactionFixture()],
        transactionsRoot: randomHash()
    };

    return {...defaults, ...nonDefaultProps};
}

export function queueTransactionFixture(
    nonDefaultProps: Partial<TransactionQueue> = {}):
    TransactionQueue {
    const defaults: TransactionQueue = {
        hash: randomHash(),
        blockHash: randomHash(),
        blockNumber: randomBlockNumber(),
        from: randomHash(),
        gas: 100,
        gasPrice: 100,
        maxFeePerGas: 100,
        maxPriorityFeePerGas: 100,
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

