import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Block = new Schema({
    hash: String,
    baseFeePerGas: Number,
    difficulty: Number,
    gasLimit: Number,
    gasUsed: Number,
    logsBloom: String,
    miner: String,
    mixHash: String,
    nonce: String,
    number: Number,
    parentHash: String,
    receiptsRoot: String,
    size: Number,
    stateRoot: String,
    timestamp: String,
    totalDifficulty: Number,
    transactions: [{
        hash: String,
        blockHash: String,
        blockNumber: Number,
        from: String,
        gas: Number,
        gasPrice: Number,
        maxFeePerGas: Number,
        maxPriorityFeePerGas: Number,
        input: String,
        nonce: Number,
        to: String,
        transactionIndex: Number,
        value: Number,
        type: {
            type: String
        },
        accessList: [String],
        chainId: Number,
        v: String,
        r: String,
        s: String
    }],
    transactionsRoot: String
});

