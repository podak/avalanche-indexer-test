import Fastify, { FastifyRequest } from 'fastify';
import { 
    BnTiSortedTxRequest,
    AddressTxNumberRequest
 } from '../../types';
import { 
    BnTiSortedTxRequestSchema,
    AddressTxNumberRequestSchema,
    ValueSortedTxRequestSchema,
    Top100BalancesRequestSchema
} from '../../schema/api';
import {
    DBClient
} from '../../services/db';

const fastify = Fastify({
    logger: true
});

const db = new DBClient();
db.connect();

fastify.route({
    method: 'GET',
    url: '/ping',
    handler: async (request, reply) => {
        return { message: 'pong' }
    }
});

fastify.route({
    method: 'GET',
    url: '/blockNTransactionIndexSortedTransactions',
    schema: BnTiSortedTxRequestSchema,
    handler: async (request: FastifyRequest<{ Querystring: BnTiSortedTxRequest }>, reply) => {
        const { type, address } = request.query;
        const storedAddress = await db.addresses.find({hash: address});

        if (storedAddress.length === 0) {
            return {transactions: []};
        }

        let hashes = []
        if (type === 'sent') {
            hashes = storedAddress[0].sentTx;
        } else if (type === 'received') {
            hashes = storedAddress[0].receivedTx;
        }

        const storedTransactions = await db.transactions.find({
            hash: {$in: hashes}
        }).sort({
            blockNumber: 1,
            transactionIndex: 1
        });

        return {
            transactions: storedTransactions
        }
    }
});

fastify.route({
    method: 'GET',
    url: '/addressNumberTransactions',
    schema: AddressTxNumberRequestSchema,
    handler: async (request: FastifyRequest<{ Querystring: AddressTxNumberRequest }>, reply) => {
        const { type, address } = request.query;
        const storedAddress = await db.addresses.find({hash: address});

        let count = 0;
        if (storedAddress.length === 0) {
            return {count};
        }

        const {sentTx, receivedTx} = storedAddress[0];
        if (type === 'received') {
            count = receivedTx.length;
        } else if (type === 'sent') {
            count = sentTx.length;
        }

        return { count }
    }
});

fastify.route({
    method: 'GET',
    url: '/transactionsByValue',
    schema: ValueSortedTxRequestSchema,
    handler: async () => {
        const transactions = await db.transactions.find().sort({value: 1});
        return { transactions }
    }
});

fastify.route({
    method: 'GET',
    url: '/top100BalanceAddresses',
    schema: Top100BalancesRequestSchema,
    handler: async () => {
        const addresses = await db.addresses.find().sort({balance: -1}).limit(100);
        return { addresses }
    }
});

export async function start() {
    try {
        await fastify.listen({ host: '0.0.0.0', port: 8080 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
