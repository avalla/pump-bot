const debug = require('debug')('pump');

async function calculateMarketPrice(binance, { pair }) {
  const ticker = await binance.prices(pair);
  const marketPrice = ticker[pair];
  return marketPrice;
}

module.exports = calculateMarketPrice;
