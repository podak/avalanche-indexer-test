import nock from 'nock';
import {config} from '../../src/config';

const AVALANCHE_BASE = `${config.AVALANCHE_NODE_URL}:${config.AVALANCHE_NODE_PORT}`

export function mockAvalancheNode(
    optional: boolean = false,
    code = 200,
    response_body: any = {code: 200, message: 'OK'}) {
    return nock(AVALANCHE_BASE)
        .post('/ext/bc/C/rpc')
        .optionally(optional)
        .reply(() => {
            return [code, response_body];
        });
}

export function lastBlockResponseFixture (
    nonDefaultProps: Partial<object> = {}):
any {
    const defaults = {
        result: '0x200cf4d',
        id:1,
        jsonrpc: '2.0'
    };

    return {...defaults, ...nonDefaultProps};
}

export function getAddressBalanceFixture (
    nonDefaultProps: Partial<object> = {}):
any {
    const defaults = {
        result: '0x57f1ad004526574',
        id:1,
        jsonrpc: '2.0'
    };

    return {...defaults, ...nonDefaultProps};
}

export function blockByNumberResponseFixture (
    nonDefaultProps: Partial<object> = {}):
any {
    const defaults = {
        result: {
            baseFeePerGas:'0xd6df72235',
            blockExtraData:'0x',
            blockGasCost:'0x0',
            difficulty:'0x1',
            extDataGasUsed:'0x0',
            extDataHash:'0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
            extraData:'0x000000000000000000000000002685fc000000000000000000000000002888b3000000000000000000000000003213520000000000000000000000000033692400000000000000000000000000000000',
            gasLimit:'0x7a1200',
            gasUsed:'0x2e928d',
            hash:'0xd574b623c70d802ab3e457cf47d46081efc4aec7b0d6b59267a1f231793d85c5',
            logsBloom:'0x0030005010008000010800008000200002010480a000404020000000800280100000104008800000006802100000600000000088000010000000400000210400a2009800014842c000020808140000201000003020440121000840808100040000800406060004020000810100000d220000002000000c001040001080000020502000205000080000a00004000008000100000024004608000400400020002802800012420040400020000021024004c0000008012021002000030000000000040004120000000840001000020000200010800002840098801000020400300000101008010800400002000c0000060804800040000090210080100000108000',
            miner:'0x0100000000000000000000000000000000000000',
            mixHash:'0x0000000000000000000000000000000000000000000000000000000000000000',
            nonce:'0x0000000000000000',
            number:'0xc5043f',
            parentHash:'0x7ff32bbe4fb8d997d226c004e6917eb1d0fa263d158b83436967efaad90159f5',
            receiptsRoot:'0x9b60d9a34fa88d7a4fe9154193805e4a7988f0beccab5474335bba696c276db5',
            sha3Uncles:'0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
            size:'0x1229',
            stateRoot:'0xfdc55d6d7feaab4583f07aa54086eaa0c96f0b39bdc98e1a71d9af2aa6f7fca8',
            timestamp:'0x6248a7af',
            totalDifficulty:'0xc5043f',
            transactions:[transactionResponseFixture()],
            transactionsRoot:'0x5963545e52db3ad1f48528b862f9f1537478ef99f28c8b5f83af5f040b0929d0'
        },
        id:1,
        jsonrpc: '2.0'
    };

    return {...defaults, ...nonDefaultProps};
}

function transactionResponseFixture (
    nonDefaultProps: Partial<object> = {}):
any {
    const defaults = {
        blockHash:'0xd574b623c70d802ab3e457cf47d46081efc4aec7b0d6b59267a1f231793d85c5',
        blockNumber:'0xc5043f',
        from:'0x0fbec3b7018a012088897dd2532f3efe7ccaa000',
        gas:'0xb540',
        gasPrice:'0xee807c9c5',
        maxFeePerGas:'0xee807c9c5',
        maxPriorityFeePerGas:'0xee807c9c5',
        hash:'0xec8ffd8970c57e820c5affb0dd332ecd9c0c83297bfd8841686672b41d6ccc38',
        input:'0x095ea7b30000000000000000000000000da67235dd5787d67955420c84ca1cecd4e5bb3bffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        nonce:'0x97',
        to:'0x136acd46c134e8269052c62a67042d6bdedde3c9',
        transactionIndex:'0x0',
        value:'0x0',
        type:'0x2',
        accessList:[],
        chainId:'0xa86a',
        v:'0x1',
        r:'0x4ba46735bd6f52cb8900a2a70386339e2fde9b6c1e71c51c0b59b5318c5b692d',
        s:'0x298fbb81d111d0f901bed09c4bded0fbc793e63f56ed6b1321c82cb948295722'
    };

    return {...defaults, ...nonDefaultProps};
}
