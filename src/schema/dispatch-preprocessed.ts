export const DispatchPreprocessedModel = {
	"$schema": "http://json-schema.org/draft-07/schema",
	"$id": "https://geob.enelint.global/dispatch-message.json",
	"type": "object",
	"title": "DispatchPreprocessedModel",
	"description": "A dispatch message preprocessed by the proxy",
	"default": {},
	"required": [
		"Dispatch",
		"PortfolioId",
		"PastEvent"
	],
	"properties": {
		"Dispatch": {
			"$id": "#properties/Dispatch",
			"type": "object",
			"title": "",
			"description": "Dispatch message provided by the RTU",
			"required": [
				"Timestamp",
				"Dispatches"
			],
			"properties": {
				"Timestamp": {
					"$id": "#properties/Timestamp",
					"type": "string",
					"title": "",
					"description": "The timestamp provided by the RTU",
					"examples": [
						"2019-10-08T19:22:53Z"
					]
				},
				"Test": {
					"$id": "#properties/Test",
					"type": "boolean",
					"title": "Test flag",
					"description": "Test flag"
				},
				"Dispatches": {
					"$id": "#properties/Dispatches",
					"type": "array",
					"properties": {
						"MessageId": {
							"$id": "#properties/MessageId",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 10000003 ]
						},
						"ResourceId": {
							"$id": "#properties/ResourceId",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 65705 ]
						},
						"DdpYear": {
							"$id": "#properties/DdpYear",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 2019 ]
						},
						"DdpMonth": {
							"$id": "#properties/DdpMonth",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 10 ]
						},
						"DdpDay": {
							"$id": "#properties/DdpDay",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 8 ]
						},
						"DdpHour": {
							"$id": "#properties/DdpHour",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 13 ]
						},
						"DdpMin": {
							"$id": "#properties/DdpMin",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 30 ]
						},
						"DdpSec": {
							"$id": "#properties/DdpSec",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 0 ]
						},
						"MessageType": {
							"$id": "#properties/MessageType",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 4 ]
						},
						"DDP": {
							"$id": "#properties/DDP",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 1000 ]
						},
						"ManualRampRate": {
							"$id": "#properties/ManualRampRate",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 0 ]
						},
						"UnitControlMode": {
							"$id": "#properties/UnitControlMode",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 4 ]
						},
						"EnergyPrice": {
							"$id": "#properties/EnergyPrice",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 10000 ]
						},
						"TMSR_PRICE": {
							"$id": "#properties/TMSR_PRICE",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 9000 ]
						},
						"TMNSR_PRICE": {
							"$id": "#properties/TMNSR_PRICE",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 8000 ]
						},
						"TMOR_PRICE": {
							"$id": "#properties/TMOR_PRICE",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 7000 ]
						},
						"MaxReduction": {
							"$id": "#properties/MaxReduction",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 500 ]
						},
						"MinReduction": {
							"$id": "#properties/MinReduction",
							"type": "number",
							"title": "",
							"description": "",
							"examples": [ 2500 ]
						},
						"AckRqd": {
							"$id": "#properties/AckRqd",
							"type": "boolean",
							"title": "",
							"description": "",
						},
						"Audit": {
							"$id": "#properties/Audit",
							"type": "boolean",
							"title": "",
							"description": "",
						},
						"Test": {
							"$id": "#properties/Test2",
							"type": "boolean",
							"title": "",
							"description": "",
						}
					}
				}
			}
		},
		"PortfolioId": {
			"$id": "#properties/PortfolioId",
			"type": "string"
		},
		"ResourceId": {
			"$id": "#properties/ResourceId",
			"type": "string"
		},
		"PastEvent": {
			"$id": "#properties/PastEvent",
			"type": ["object","null"],
			"title": "",
			"description": "Existing active event in Flex",
			"required": [
				"Id",
				"Start",
				"End",
				"PortfolioId",
				"Type"
			],
			"properties": {
				"Id": {
					"$id": "#properties/EventId",
					"type": "string"
				},
				"Start": {
					"$id": "#properties/EventStart",
					"type": "string"
				},
				"End": {
					"$id": "#properties/EventEnd",
					"type": ["string", "null"]
				},
				"PortfolioId": {
					"$id": "#properties/EventPortfolioId",
					"type": "string"
				},
				"Type": {
					"$id": "#properties/EventType",
					"type": "string"
				},
			}
		}
	}
};
