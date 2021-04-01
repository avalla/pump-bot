const chalk = require('chalk');
const debug = require('debug')('pump');
const { round } = require('../../helpers');

async function calculateSellPrice(binance, { profit, lowPrice }) {
  const sellPrice = round(lowPrice * (1 + profit));
  console.log(Date.now(), `Sell price is`, chalk.red.bold(sellPrice));
  return sellPrice;
}

module.exports = calculateSellPrice;
