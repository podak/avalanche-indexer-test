import amqplib = require('amqplib');
import { logger } from '../logger';
import { RabbitMQGeneric } from './rabbitmq-generic';
import Ajv = require('ajv');

const ajv = new Ajv();

export class RabbitMQReader<T> extends RabbitMQGeneric {

    private validate: any;

    constructor(model: any) {
        super();
        this.validate = ajv.compile(model);
    }

    public async onMessages(queueName: string, callback: (message: T) => void): Promise<void> {
        await this.channel.assertQueue(queueName);
        this.channel.consume(queueName, (message) => {
            if (message === null) {
                logger.info('Message receved is empty, skipping it.');
                return;
            }

            const {content} = message;

            this.channel.ack(message);
            // logger.info(`Retrieved a message from queue ${queueName}`);

            const record = this.parseRecord(content);
            if (!record) {
                logger.error('Message format is not valid.');
                return;
            }

            // logger.info('Message parsed with success.');

            callback(record);
        });
    }

    private parseRecord(record: any): T {
        // JSON parse and apply JSON-schema validation
        try {
            const data = JSON.parse(record);
            const valid = this.validate(data);
            if (!valid) {
                const error = this.validate.errors[0];
                throw new Error(`${error.dataPath}: ${error.message} ${record}`);
            }
            return data as T;
        } catch (e) {
            logger.error({
                action: 'error_parsing_record',
                message: e.message
            });
        }
    }

}