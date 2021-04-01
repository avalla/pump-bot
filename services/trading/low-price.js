const chalk = require('chalk');

async function calculateLowPrice(binance, { pair, interval }) {
  const ticks = await binance.candlesticks(pair, interval, undefined, { limit: 1 });
  const [tick] = ticks;
  const [time, open, high, lowPrice, close] = tick;

  console.log(Date.now(), `Minimum price in ${interval} was`, chalk.red.bold(lowPrice));
  return lowPrice;
}

module.exports = calculateLowPrice;
