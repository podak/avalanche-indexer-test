export const BlockModel = {
	"$schema": "http://json-schema.org/draft-07/schema",
	"type": "object",
	"title": "BlockModel",
	"default": {},
	"required": [
		"baseFeePerGas",
    	"difficulty",
    	"gasLimit",
    	"gasUsed",
    	"hash",
    	"logsBloom",
    	"miner",
    	"mixHash",
    	"nonce",
    	"number",
    	"parentHash",
    	"receiptsRoot",
    	"size",
    	"stateRoot",
    	"timestamp",
    	"totalDifficulty",
    	"transactionsRoot"
	],
	"properties": {
		"baseFeePerGas": {
			"$id": "#properties/baseFeePerGas",
			"type": "number",
		},
		"difficulty": {
			"$id": "#properties/difficulty",
			"type": "number",
		},
		"gasLimit": {
			"$id": "#properties/gasLimit",
			"type": "number",
		},
		"gasUsed": {
			"$id": "#properties/gasUsed",
			"type": "number",
		},
		"hash": {
			"$id": "#properties/hash",
			"type": "string",
		},
		"logsBloom": {
			"$id": "#properties/logsBloom",
			"type": "string",
		},
		"miner": {
			"$id": "#properties/miner",
			"type": "string",
		},
		"mixHash": {
			"$id": "#properties/mixHash",
			"type": "string",
		},
		"nonce": {
			"$id": "#properties/nonce",
			"type": "string",
		},
		"parentHash": {
			"$id": "#properties/parentHash",
			"type": "string",
		},
		"receiptsRoot": {
			"$id": "#properties/receiptsRoot",
			"type": "string",
		},
		"size": {
			"$id": "#properties/size",
			"type": "number",
		},
		"stateRoot": {
			"$id": "#properties/stateRoot",
			"type": "string",
		},
		"timestamp": {
			"$id": "#properties/timestamp",
			"type": "string",
		},
		"totalDifficulty": {
			"$id": "#properties/totalDifficulty",
			"type": "number",
		},
		"transactionsRoot": {
			"$id": "#properties/transactionsRoot",
			"type": "string",
		},
		"transactions": {
			"$id": "#properties/transactions",
			"type": "array",
			"properties": {
				"blockHash": {
					"$id": "#properties/txblockHash",
					"type": "string",
				},
				"blockNumber": {
					"$id": "#properties/txblockNumber",
					"type": "number",
				},
				"from": {
					"$id": "#properties/txfrom",
					"type": "string",
				},
				"gas": {
					"$id": "#properties/txgas",
					"type": "number",
				},
				"gasPrice": {
					"$id": "#properties/txgasPrice",
					"type": "number",
				},
				"maxFeePerGas": {
					"$id": "#properties/txmaxFeePerGas",
					"type": "number",
				},
				"maxPriorityFeePerGas": {
					"$id": "#properties/txmaxPriorityFeePerGas",
					"type": "number",
				},
				"hash": {
					"$id": "#properties/txhash",
					"type": "string",
				},
				"input": {
					"$id": "#properties/txinput",
					"type": "string",
				},
				"nonce": {
					"$id": "#properties/txnonce",
					"type": "number",
				},
				"to": {
					"$id": "#properties/txto",
					"type": "string",
				},
				"transactionIndex": {
					"$id": "#properties/txtransactionIndex",
					"type": "number",
				},
				"value": {
					"$id": "#properties/txvalue",
					"type": "number",
				},
				"type": {
					"$id": "#properties/txtype",
					"type": "string",
				},
				"accessList": {
					"$id": "#properties/txaccessList",
					"type": "array",
					"items": {
						"type": "string"
					}
				},
				"chainId": {
					"$id": "#properties/txchainId",
					"type": "number",
				},
				"v": {
					"$id": "#properties/txv",
					"type": "string",
				},
				"r": {
					"$id": "#properties/txr",
					"type": "string",
				},
				"s": {
					"$id": "#properties/txs",
					"type": "string",
				}
			}
		}
	}
};
