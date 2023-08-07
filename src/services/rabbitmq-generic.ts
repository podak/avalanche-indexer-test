import amqplib = require('amqplib');
import { logger } from '../logger';
import { config } from '../config';

interface IRabbitConfigs {
    protocol: string;
    hostname: string;
    port: number;
    username: string;
    password: string;
    vhost: string;
}

export class RabbitMQGeneric {

    protected channel: any;
    protected connection: any;

    public async connect(options: IRabbitConfigs): Promise<void> {
        try {
            logger.info('Connetting to rabbit server. ', {url: options.hostname});
            this.connection = await amqplib.connect(options);
            this.channel = await this.connection.createChannel();
            logger.info('Connected successfully to rabbit server. ', {url: options.hostname});
        } catch (e) {
            logger.error('Error: could not connect to rabbitMQ.', {err: e});
            throw e;
        }
    }

    public async connectWithConfig(): Promise<void> {
        await this.connect({
            protocol: config.RABBITMQ_PROTOCOL,
            hostname: config.RABBITMQ_URL,
            port: config.RABBITMQ_PORT,
            username: config.RABBITMQ_USER,
            password: config.RABBITMQ_PASSWORD,
            vhost: config.RABBITMQ_VHOST
        });
    }

    public disconnect(): void {
        if (this.connection) {
            logger.info('Disconnetting from rabbit server.');
            this.connection.close();
        }
    }

}