import { Address } from '../entities/address';
import { Block } from '../entities/block';
import { Download } from '../entities/download';
import { Transaction } from '../entities/transaction';
import mongoose from 'mongoose';
import { logger } from '../logger';
import { config } from '../config';

export class DBClient {

    private connection;
    public addresses;
    public blocks;
    public downloads;
    public transactions;

    public async connect() {
        logger.info(`Connecting to db mongodb://${config.DB_URL}/${config.DB_NAME}`);
        try {
            this.connection = await mongoose.connect(`mongodb://${config.DB_URL}/${config.DB_NAME}`, {
                auth: {
                    username: config.DB_USER,
                    password: config.DB_PASS
                },
                authSource: 'admin'
            });
        } catch (e) {
            logger.error('Could not connect to the DB', {error: e});
            throw e;
        }
        this.addresses = mongoose.model('Address', Address);
        this.blocks = mongoose.model('Block', Block);
        this.downloads = mongoose.model('Download', Download);
        this.transactions = mongoose.model('Transaction', Transaction);
    }

    public async disconnect() {
        await this.connection.disconnect();
        this.addresses = null;
        this.blocks = null;
        this.downloads = null;
        this.transactions = null;
    }
}
