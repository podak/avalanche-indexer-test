import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Download = new Schema({
    blockNumber: String,
    dttm: Date
});

