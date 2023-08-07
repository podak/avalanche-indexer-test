export const DownloadModel = {
	"$schema": "http://json-schema.org/draft-07/schema",
	"type": "object",
	"required": [
		"blockNumber",
		"dttm",
	],
	"properties": {
		"blockNumber": {
			"$id": "#properties/blockNumber",
			"type": "number"
		},
		"dttm": {
			"$id": "#properties/dttm",
			"type": "string"
		}
	}
};
