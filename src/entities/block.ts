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
    transactions: [String],
    transactionsRoot: String
});

