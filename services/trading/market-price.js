const chalk = require('chalk');
// const debug = require('debug')('pump');

async function marketPrice(binance, { pair }) {
  const ticker = await binance.prices(pair);
  const market = ticker[pair];
  console.log(Date.now(), chalk.bgGray.white(`> MKT PRICE: ${market}`), ticker);
  return market;
}

module.exports = marketPrice;
