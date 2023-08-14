export const BnTiSortedTxRequestSchema = {
    querystring: {
        type: 'object',
        required: ['type', 'address'],
        properties: {
            type: {
                type: 'string',
                enum: ['sent', 'received']
            },
            address: {type: 'string'},
            page: {type: 'number'}
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                count: {type: 'number'},
                page: {type: 'number'},
                lastPage: {type: 'number'},
                transactions: {
                    type: 'array',
                    properties: {
                        blockHash: {
                            type: 'string',
                        },
                        blockNumber: {
                            type: 'number',
                        },
                        from: {
                            type: 'string',
                        },
                        gas: {
                            type: 'number',
                        },
                        gasPrice: {
                            type: 'number',
                        },
                        maxFeePerGas: {
                            type: 'number',
                        },
                        maxPriorityFeePerGas: {
                            type: 'number',
                        },
                        hash: {
                            type: 'string',
                        },
                        input: {
                            type: 'string',
                        },
                        nonce: {
                            type: 'number',
                        },
                        to: {
                            type: 'string',
                        },
                        transactionIndex: {
                            type: 'number',
                        },
                        value: {
                            type: 'number',
                        },
                        type: {
                            type: 'string',
                        },
                        accessList: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },
                        chainId: {
                            'type': 'number',
                        },
                        v: {
                            'type': 'string',
                        },
                        r: {
                            'type': 'string',
                        },
                        s: {
                            'type': 'string',
                        }
                    }
                }
            }
        }
    }
}

export const AddressTxNumberRequestSchema = {
    querystring: {
        type: 'object',
        required: ['type', 'address'],
        properties: {
            type: {
                type: 'string',
                enum: ['sent', 'received']
            },
            address: {type: 'string'},
            page: {type: 'number'}
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                count: {
                    type: 'number',
                }
            }
        }
    }
}

export const ValueSortedTxRequestSchema = {
    querystring: {
        type: 'object',
        properties: {
            page: {type: 'number'}
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                count: {type: 'number'},
                page: {type: 'number'},
                lastPage: {type: 'number'},
                transactions: {
                    type: 'array',
                    properties: {
                        blockHash: {
                            type: 'string',
                        },
                        blockNumber: {
                            type: 'number',
                        },
                        from: {
                            type: 'string',
                        },
                        gas: {
                            type: 'number',
                        },
                        gasPrice: {
                            type: 'number',
                        },
                        maxFeePerGas: {
                            type: 'number',
                        },
                        maxPriorityFeePerGas: {
                            type: 'number',
                        },
                        hash: {
                            type: 'string',
                        },
                        input: {
                            type: 'string',
                        },
                        nonce: {
                            type: 'number',
                        },
                        to: {
                            type: 'string',
                        },
                        transactionIndex: {
                            type: 'number',
                        },
                        value: {
                            type: 'number',
                        },
                        type: {
                            type: 'string',
                        },
                        accessList: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },
                        chainId: {
                            'type': 'number',
                        },
                        v: {
                            'type': 'string',
                        },
                        r: {
                            'type': 'string',
                        },
                        s: {
                            'type': 'string',
                        }
                    }
                }
            }
        }
    }
}

export const Top100BalancesRequestSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                addresses: {
                    type: 'array',
                    properties: {
                        hash: {
                            type: 'string',
                        },
                        balance: {
                            type: 'number',
                        },
                        sentTx: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },
                        receivedTx: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        }
                    }
                },
            }
        }
    }
}