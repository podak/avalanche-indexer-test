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
			"type": [ "number", "null" ],
		},
		"difficulty": {
			"$id": "#properties/difficulty",
			"type": [ "number", "null" ],
		},
		"gasLimit": {
			"$id": "#properties/gasLimit",
			"type": [ "number", "null" ],
		},
		"gasUsed": {
			"$id": "#properties/gasUsed",
			"type": [ "number", "null" ],
		},
		"hash": {
			"$id": "#properties/hash",
			"type": [ "string", "null" ],
		},
		"logsBloom": {
			"$id": "#properties/logsBloom",
			"type": [ "string", "null" ],
		},
		"miner": {
			"$id": "#properties/miner",
			"type": [ "string", "null" ],
		},
		"mixHash": {
			"$id": "#properties/mixHash",
			"type": [ "string", "null" ],
		},
		"nonce": {
			"$id": "#properties/nonce",
			"type": [ "string", "null" ],
		},
		"parentHash": {
			"$id": "#properties/parentHash",
			"type": [ "string", "null" ],
		},
		"receiptsRoot": {
			"$id": "#properties/receiptsRoot",
			"type": [ "string", "null" ],
		},
		"size": {
			"$id": "#properties/size",
			"type": [ "number", "null" ],
		},
		"stateRoot": {
			"$id": "#properties/stateRoot",
			"type": [ "string", "null" ],
		},
		"timestamp": {
			"$id": "#properties/timestamp",
			"type": [ "string", "null" ],
		},
		"totalDifficulty": {
			"$id": "#properties/totalDifficulty",
			"type": [ "number", "null" ],
		},
		"transactionsRoot": {
			"$id": "#properties/transactionsRoot",
			"type": [ "string", "null" ],
		},
		"transactions": {
			"$id": "#properties/transactions",
			"type": "array",
			"properties": {
				"blockHash": {
					"$id": "#properties/txblockHash",
					"type": [ "string", "null" ],
				},
				"blockNumber": {
					"$id": "#properties/txblockNumber",
					"type": [ "number", "null" ],
				},
				"from": {
					"$id": "#properties/txfrom",
					"type": [ "string", "null" ],
				},
				"gas": {
					"$id": "#properties/txgas",
					"type": [ "number", "null" ],
				},
				"gasPrice": {
					"$id": "#properties/txgasPrice",
					"type": [ "number", "null" ],
				},
				"maxFeePerGas": {
					"$id": "#properties/txmaxFeePerGas",
					"type": [ "number", "null" ],
				},
				"maxPriorityFeePerGas": {
					"$id": "#properties/txmaxPriorityFeePerGas",
					"type": [ "number", "null" ],
				},
				"hash": {
					"$id": "#properties/txhash",
					"type": [ "string", "null" ],
				},
				"input": {
					"$id": "#properties/txinput",
					"type": [ "string", "null" ],
				},
				"nonce": {
					"$id": "#properties/txnonce",
					"type": [ "number", "null" ],
				},
				"to": {
					"$id": "#properties/txto",
					"type": [ "string", "null" ],
				},
				"transactionIndex": {
					"$id": "#properties/txtransactionIndex",
					"type": [ "number", "null" ],
				},
				"value": {
					"$id": "#properties/txvalue",
					"type": [ "number", "null" ],
				},
				"type": {
					"$id": "#properties/txtype",
					"type": [ "string", "null" ],
				},
				"accessList": {
					"$id": "#properties/txaccessList",
					"type": "array",
					"items": {
						"type": [ "string", "null" ]
					}
				},
				"chainId": {
					"$id": "#properties/txchainId",
					"type": [ "number", "null" ],
				},
				"v": {
					"$id": "#properties/txv",
					"type": [ "string", "null" ],
				},
				"r": {
					"$id": "#properties/txr",
					"type": [ "string", "null" ],
				},
				"s": {
					"$id": "#properties/txs",
					"type": [ "string", "null" ],
				}
			}
		}
	}
};
