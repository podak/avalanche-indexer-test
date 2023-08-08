export const TransactionModel = {
	"$schema": "http://json-schema.org/draft-07/schema",
	"type": "object",
	"title": "TransactionModel",
	"default": {},
	"required": [
		"blockHash",
		"blockNumber",
		"from",
		"gas",
		"gasPrice",
		"maxFeePerGas",
		"maxPriorityFeePerGas",
		"hash",
		"input",
		"nonce",
		"to",
		"transactionIndex",
		"value",
		"type",
		"accessList",
		"chainId",
		"v",
		"r",
		"s"
	],
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
};
