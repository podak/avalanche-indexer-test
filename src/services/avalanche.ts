import axios from 'axios';
import {config} from '../config';
import {logger} from '../logger';
import { BlockDB, TransactionDB } from '../types';

const AVALANCHE_BASE = `${config.AVALANCHE_NODE_URL}:${config.AVALANCHE_NODE_PORT}/ext/bc/C/rpc`;
const SHARED_PARAMS = {
    jsonrpc: '2.0',
    id: config.AVALANCHE_NETWORK_ID
}

export async function getAddressBalance(hash: string): Promise<number> {
    let resp;

    try {
        resp = await axios.post(`${AVALANCHE_BASE}`, {
            ...SHARED_PARAMS,
            method: 'eth_getBalance',
            params: [hash, 'latest']
        });

    } catch (e) {
        logger.error('Last block number retrieval failed: ', {error: e});
        throw e;
    }

    const blockNumber = parseInt(resp.data.result);
    logger.info('Retrieved last block number from avalance node: ', {blockNumber});
    return blockNumber;
}

export async function getLastBlockNumber(): Promise<number> {
    let resp;

    try {
        resp = await axios.post(`${AVALANCHE_BASE}`, {
            ...SHARED_PARAMS,
            method: 'eth_blockNumber'
        });

    } catch (e) {
        logger.error('Last block number retrieval failed: ', {error: e});
        throw e;
    }

    const blockNumber = parseInt(resp.data.result);
    logger.info('Retrieved last block number from avalance node: ', {blockNumber});
    return blockNumber;
}

export async function getBlockByNumber(n: number): Promise<BlockDB> {
    let resp;

    try {
        resp = await axios.post(`${AVALANCHE_BASE}`, {
            ...SHARED_PARAMS,
            method: 'eth_getBlockByNumber',
            params: [`0x${n.toString(16)}`, true]
        });

    } catch (e) {
        logger.error('Block retrieval failed: ', {blockNumber: n, error: e});
        throw e;
    }
    
    const block = resp.data.result;
    logger.info('Retrieved block from avalance node', {blockNumber: n});
    
    return responseToBlock(block);
}

function responseToBlock(data: any): BlockDB {
    // filtering out some of the fields
    const {
        baseFeePerGas,
        difficulty,
        gasLimit,
        gasUsed,
        hash,
        logsBloom,
        miner,
        mixHash,
        nonce,
        number,
        parentHash,
        receiptsRoot,
        size,
        stateRoot,
        timestamp,
        totalDifficulty,
        transactionsRoot
    } = data;

    const transactions = data.transactions.map((t) => responseToTx(t));

    // converting numerical values
    return {
        baseFeePerGas: parseInt(baseFeePerGas),
        difficulty: parseInt(difficulty),
        gasLimit: parseInt(gasLimit),
        gasUsed: parseInt(gasUsed),
        hash,
        logsBloom,
        miner,
        mixHash,
        nonce,
        number: parseInt(number),
        parentHash,
        receiptsRoot,
        size: parseInt(size),
        stateRoot,
        timestamp,
        totalDifficulty: parseInt(totalDifficulty),
        transactions,
        transactionsRoot
    }
}

function responseToTx(data: any): TransactionDB {
    // filtering out some of the fields
    const {
        blockHash,
        blockNumber,
        from,
        gas,
        gasPrice,
        maxFeePerGas,
        maxPriorityFeePerGas,
        hash,
        input,
        nonce,
        to,
        transactionIndex,
        value,
        type,
        accessList,
        chainId,
        v,
        r,
        s
    } = data;

    // converting numerical values
    return {
        blockHash,
        blockNumber: parseInt(blockNumber),
        from,
        gas: parseInt(gas),
        gasPrice: parseInt(gasPrice),
        maxFeePerGas: parseInt(maxFeePerGas),
        maxPriorityFeePerGas: parseInt(maxPriorityFeePerGas),
        hash,
        input,
        nonce: parseInt(nonce),
        to,
        transactionIndex: parseInt(transactionIndex),
        value: parseInt(value),
        type,
        accessList,
        chainId: parseInt(chainId),
        v,
        r,
        s
    }
}