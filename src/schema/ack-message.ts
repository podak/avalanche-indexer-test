export const AckMessageModel = {
	"$schema": "http://json-schema.org/draft-07/schema",
	"$id": "https://geob.enelint.global/dispatch-ack.json",
	"type": "object",
	"title": "DispatchAck",
	"description": "The acknowledge for a dispatch received from ISO NE RTU.",
	"default": {},
	"required": [
		"MessageType",
		"IntProp",
		"Timestamp"
	],
	"properties": {
		"SequenceNr": {
			"$id": "#properties/SequenceNr",
			"type": "number",
			"title": "",
			"description": "",
			"examples": [
				1
			]
		},
		"MessageType": {
			"$id": "#properties/MessageType",
			"type": "string",
			"title": "",
			"description": "",
			"examples": [
				"ACK"
			]
		},
		"IntProp": {
			"$id": "#properties/terna_message_id",
			"type": "string",
			"title": "",
			"description": "",
			"examples": [
				"65705"
			]
		},
		"Timestamp": {
			"$id": "#properties/timestamp",
			"type": "string",
			"title": "",
			"description": "",
			"examples": [
				"2019-10-08T19:22:53Z"
			]
		}
	}
};
