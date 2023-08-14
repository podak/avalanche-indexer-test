import { RabbitMQGeneric } from './rabbitmq-generic';
import { logger } from '../logger';

export class RabbitMQWriter extends RabbitMQGeneric {

    public async writeQueue(name: string, messages: any[]): Promise<void> {
        try {
            await this.channel.assertQueue(name);
            logger.info('Sending to rabbit queue: ', {messages});
            for (const message of messages) {
                await this.channel.sendToQueue(name, Buffer.from(JSON.stringify(message)));
            }
        } catch (e) {
            logger.error(`Error: could not write messages in queue ${name}`, {
                err: e,
                messages
            });
            throw e;
        }
    }

    public async writeExchange(name: string, type: string, routingKey: string, messages: any[]): Promise<void> {
        try {
            await this.channel.assertExchange(name, type);
            logger.info('Sending to rabbit exchange: ', {name, count: messages.length});
            for (const message of messages) {
                await this.channel.publish(name, routingKey, Buffer.from(JSON.stringify(message)));
            }
        } catch (e) {
            logger.error(`Error: could not write messages in exchange ${name}`, {
                err: e,
                messages
            });
            throw e;
        }
    }

}