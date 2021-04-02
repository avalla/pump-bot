const chalk = require('chalk');
const debug = require('debug')('pump');
const { round } = require('../../helpers');

async function calculateStopPrice(binance, { buyPrice, stopLoss, quantity, threshold }) {
  const stopPrice = round((1 - stopLoss) * buyPrice);
  console.log(
    Date.now(),
    chalk.bgGray.white(`> STOP-LOSS PRICE ${stopPrice}`)
  );

  if (stopPrice * quantity < threshold) {
    const override = round(threshold / quantity);
    console.log(
      Date.now(),
      chalk.bgGray.white(`  > Warning stop-loss order will be lower than threshold so overriding with ${override}`)
    );
    return override;
  }
  return stopPrice;
}

module.exports = calculateStopPrice;
