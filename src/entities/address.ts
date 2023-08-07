import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Address = new Schema({
    hash: String,
    balance: Number,
    sentTx: [String],
    receivedTx: [String]
});
