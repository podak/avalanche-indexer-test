import { RabbitMQWriter } from '../../src/services/rabbitmq-writer';
import { RabbitMQReader } from '../../src/services/rabbitmq-reader';


const writer = new RabbitMQWriter();

export async function setX(acks: any[]): Promise<void> {
    await writer.connectWithConfig();
    //await writer.writeQueue(config.ACK_QUEUE_NAME, acks);
}

export async function monitorQueue<T>(queueName: string, model: any): Promise<any> {
    const rabbit = new RabbitMQReader<T>(model);
    const messages = [];
    await rabbit.connectWithConfig();

    rabbit.onMessages(queueName, (message) => {
        messages.push(message);
    });

    return {
        done: rabbit.disconnect,
        getMessages: () => (messages)
    }
}