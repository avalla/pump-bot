const chalk = require('chalk');
const debug = require('debug')('pump');
const { round } = require('../../helpers');

async function calculateStopPrice(binance, { marketPrice, stopLoss, quantity, main, configuration }) {
  const stopPrice = round((1 - stopLoss) * marketPrice);
  const total = stopPrice * quantity;
  const min = configuration.thresholds[main];
  console.log(Date.now(), `Calculated STOP-PRICE`, chalk.red.bold(`${stopPrice} ${main}`));
  if (total < min) {
    const override = round(min / quantity);
    console.log(
      Date.now(),
      `Warning stop-loss order will be lower than threshold`,
      chalk.red.bold(`${total} ${main}`),
      '<',
      chalk.red.bold(`${min} ${main}`),
      'overriding with',
      chalk.red.bold(`${override} ${main}`)
    );
    return override;
  }
  return stopPrice;
}

module.exports = calculateStopPrice;
