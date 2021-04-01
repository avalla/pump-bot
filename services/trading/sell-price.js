const chalk = require('chalk');
const debug = require('debug')('pump');
const { round } = require('../../helpers');

async function calculateSellPrice(binance, { pair, profit, interval }) {
  const ticks = await binance.candlesticks(pair, interval, undefined, { limit: 1 });
  const [tick] = ticks;
  const [time, open, high, low, close] = tick;

  const sellPrice = round(low * (1 + profit));
  console.log(Date.now(), `Minimum price in ${interval} was`, chalk.red.bold(low));
  return sellPrice;
}

module.exports = calculateSellPrice;
