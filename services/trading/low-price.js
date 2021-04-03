const chalk = require('chalk');

async function lowPrice(binance, { pair, interval }) {
  const ticks = await binance.candlesticks(pair, interval, undefined, { limit: 1 });
  const [tick] = ticks;
  const [time, open, high, low, close] = tick;

  console.log(Date.now(), chalk.bgGray.white(`> MIN PRICE in ${interval} was ${low}`));
  return low;
}

module.exports = lowPrice;
