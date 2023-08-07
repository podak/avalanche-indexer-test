import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Transaction = new Schema({
    hash: String,
    blockHash: String,
    blockNumber: Number,
    from: String,
    gas: Number,
    gasPrice: Number,
    maxFeePerGas: Number,
    maxPriorityFeePerGase: Number,
    input: String,
    nonce: Number,
    to: String,
    transactionIndex: Number,
    value: Number,
    type: String,
    accessList: [String],
    chainId: Number,
    v: String,
    r: String,
    s: String
});
