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
			"$id": "#properties/blockHash",
			"type": "string",
		},
		"blockNumber": {
			"$id": "#properties/blockNumber",
			"type": "number",
		},
		"from": {
			"$id": "#properties/from",
			"type": "string",
		},
		"gas": {
			"$id": "#properties/gas",
			"type": "number",
		},
		"gasPrice": {
			"$id": "#properties/gasPrice",
			"type": "number",
		},
		"maxFeePerGas": {
			"$id": "#properties/maxFeePerGas",
			"type": "number",
		},
		"maxPriorityFeePerGas": {
			"$id": "#properties/maxPriorityFeePerGas",
			"type": "number",
		},
		"hash": {
			"$id": "#properties/hash",
			"type": "string",
		},
		"input": {
			"$id": "#properties/input",
			"type": "string",
		},
		"nonce": {
			"$id": "#properties/nonce",
			"type": "number",
		},
		"to": {
			"$id": "#properties/to",
			"type": "string",
		},
		"transactionIndex": {
			"$id": "#properties/transactionIndex",
			"type": "number",
		},
		"value": {
			"$id": "#properties/value",
			"type": "number",
		},
		"type": {
			"$id": "#properties/type",
			"type": "string",
		},
		"accessList": {
			"$id": "#properties/accessList",
			"type": "array",
			"items": {
				"type": "string"
			}
		},
		"chainId": {
			"$id": "#properties/chainId",
			"type": "number",
		},
		"v": {
			"$id": "#properties/v",
			"type": "string",
		},
		"r": {
			"$id": "#properties/r",
			"type": "string",
		},
		"s": {
			"$id": "#properties/s",
			"type": "string",
		}
	}
};
