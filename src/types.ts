export interface AvalancheBlock {
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
    transactions: AvalancheTx[],
    transactionsRoot: string
}

export interface AvalancheTx {
    blockHash: string,
    blockNumber: number,
    from: string,
    gas: number,
    gasPrice: number,
    maxFeePerGas: number,
    maxPriorityFeePerGase: number,
    hash: string,
    input: string,
    nonce: number
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

export interface AddressDB {
    hash: string,
    balance: number,
    sentTx: string[],
    receivedTx: string[]
}

export interface DownloadDB {
    blockNumber: number,
    dttm: Date
}

export interface BlockDB {
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
    transactions: string[],
    transactionsRoot: string
}
