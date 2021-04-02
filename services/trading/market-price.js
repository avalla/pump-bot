const chalk = require('chalk')
// const debug = require('debug')('pump');

async function calculateMarketPrice(binance, { pair }) {
  const ticker = await binance.prices(pair);
  const marketPrice = ticker[pair];
  console.log(
    Date.now(),
    chalk.bgGray.white(`> MKT PRICE: ${marketPrice}`)
  );
  return marketPrice;
}

module.exports = calculateMarketPrice;
