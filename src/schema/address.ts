export const AddressModel = {
	"$schema": "http://json-schema.org/draft-07/schema",
	"type": "object",
	"default": {},
	"required": [
		"hash"
	],
	"properties": {
		"hash": {
			"$id": "#properties/hash",
			"type": "string",
		},
		"balance": {
			"$id": "#properties/balance",
			"type": "number",
		},
		"sentTx": {
			"$id": "#properties/sentTx",
			"type": "array",
			"items": {
				"type": "string"
			}
		},
		"receivedTx": {
			"$id": "#properties/receivedTx",
			"type": "array",
			"items": {
				"type": "string"
			}
		},
		"newSentTx": {
			"$id": "#properties/sentTx",
			"type": "array",
			"items": {
				"type": "string"
			}
		},
		"newReceivedTx": {
			"$id": "#properties/receivedTx",
			"type": "array",
			"items": {
				"type": "string"
			}
		}
	}
};
