export const BnTiSortedTxRequestSchema = {
    body: {
      type: 'object',
      required: ['type', 'address'],
      properties: {
          type: {
            type: 'string',
            enum: ['sent', 'received']
        },
          address: {type: 'string'}
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          transactions: {
            type: 'array',
            items: {
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
  }

export const AddressTxNumberRequestSchema = {
  body: {
    type: 'object',
    required: ['type', 'address'],
    properties: {
        type: {
            type: 'string',
            enum: ['sent', 'received']
        },
        address: {type: 'string'}
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
    response: {
        200: {
          type: 'object',
          properties: {
            transactions: {
              type: 'array',
              items: {
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