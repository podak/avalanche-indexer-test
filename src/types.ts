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
    transactionsRoot: string,
    transactions: TransactionDB[]
}

interface TransactionBase {
    blockHash: string,
    blockNumber: number,
    from: string,
    gas: number,
    gasPrice: number,
    maxFeePerGas: number,
    maxPriorityFeePerGas: number,
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
    balance?: number
}

interface DownloadBase {
    blockNumber: number,
}

export interface AddressDB extends AddressBase {
    sentTx: string[],
    receivedTx: string[]
}
export interface AddressQueue extends AddressBase {
    newSentTx: string[],
    newReceivedTx: string[]
}

export interface DownloadDB extends DownloadBase {
    dttm: Date
}
export interface DownloadQueue extends DownloadBase {
    dttm: string
}

export interface TransactionDB extends TransactionBase {}
export interface TransactionQueue extends TransactionBase {}

export interface BlockDB extends BlockBase {}
export interface BlockQueue extends BlockBase {}

export enum QueueRouteKeys {
    UPDATE_BLOCK = 'block',
    UPDATE_TRANSACTION = 'transaction',
    UPDATE_ADDRESS = 'address'
}

export interface BnTiSortedTxRequest {
    type: string,
    address: string
}

export interface AddressTxNumberRequest {
    type: string,
    address: string
}

