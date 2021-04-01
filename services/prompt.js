const prompt = require('prompt');

function schema(defaults) {
  return {
    properties: {
      interval: {
        description: 'Enter candle interval (e.g. 1m, 5m, 1d, 1w, etc)',
        type: 'string',
        pattern: /^\d+[mdw]$/,
        message: 'Time should be formatted as <number><m|d|w>',
        default: defaults.interval || '30m',
        required: true,
      },
      profit: {
        description: 'Enter profit percentage (enter 0.20 for 20%)',
        type: 'number',
        pattern: /^\d+$/,
        message: 'Profit should be a number',
        default: defaults.profit,
        required: true,
      },
      stopLoss: {
        description: 'Enter stop-loss percentage (enter 0.1 for 10%)',
        type: 'number',
        message: 'Percentage should be a number',
        default: defaults.stopLoss,
        required: true,
      },
      total: {
        description: 'How many of main currency (e.g. BTC or USDT)',
        type: 'number',
        message: 'Total shoud be a number',
        required: true,
        default: defaults.total,
      },
      main: {
        pattern: /^[A-Z]+$/,
        description: 'Enter main currency (e.g. BTC or USDT)',
        message: 'Currency not recorgnized, sorry',
        required: true,
        default: defaults.main,
      },
      secondary: {
        pattern: /^[A-Z]+$/,
        description: 'Enter seconday currency (e.g. WIN)',
        message: 'Currency not recognized, sorry',
        required: true,
        default: defaults.secondary,
      },
    },
  };
}

function start(configuration) {
  prompt.start();
  return async function () {
    return prompt.get(schema(configuration.defaults));
  };
}

module.exports = start;
