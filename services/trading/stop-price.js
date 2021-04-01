const chalk = require('chalk');
const debug = require('debug')('pump');
const { round } = require('../../helpers');

async function calculateStopPrice(binance, { marketPrice, stopLoss, quantity, threshold }) {
  const stopPrice = round((1 - stopLoss) * marketPrice);
  console.log(Date.now(), `Calculated stop-loss price`, chalk.red.bold(stopPrice));

  if (stopPrice * quantity < threshold) {
    const override = round(threshold / quantity);
    console.log('  Warning stop-loss order will be lower than threshold so overriding with',
      chalk.red.bold(override),
    );
    return override;
  }
  return stopPrice;
}

module.exports = calculateStopPrice;
