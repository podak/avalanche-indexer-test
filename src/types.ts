interface BlockBase {
    baseFeePerGas: number,
    difficulty: number,
    gasLimit: number,
    gasUsed: number,
    hash: string,
    logsBloom: string,
    miner: string,
    mixHash: string,
    nonce: string,
    number: number,
    parentHash: string,
    receiptsRoot: string,
    size: number,
    stateRoot: string,
    timestamp: string,
    totalDifficulty: number,
    transactionsRoot: string
}

interface TransactionBase {
    blockHash: string,
    blockNumber: number,
    from: string,
    gas: number,
    gasPrice: number,
    maxFeePerGas: number,
    maxPriorityFeePerGase: number,
    hash: string,
    input: string,
    nonce: number,
    to: string,
    transactionIndex: number,
    value: number,
    type: string,
    accessList: string[],
    chainId: number,
    v: string,
    r: string,
    s: string
}

interface AddressBase {
    hash: string,
    balance: number,
    sentTx: string[],
    receivedTx: string[]
}

interface DownloadBase {
    blockNumber: number,
}

export interface AddressDB extends AddressBase {}
export interface AddressQueue extends AddressBase {}

export interface DownloadDB extends DownloadBase {
    dttm: Date
}
export interface DownloadQueue extends DownloadBase {
    dttm: string
}

export interface TransactionDB extends TransactionBase {}
export interface TransactionQueue extends TransactionBase {}

export interface BlockDB extends BlockBase {
    transactions: TransactionDB[]
}
export interface BlockQueue extends BlockBase {
    transactions: string[]
}

