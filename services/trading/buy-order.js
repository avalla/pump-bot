const debug = require('debug')('pump');
const chalk = require('chalk')
async function buyOder(binance, { pair, marketPrice, quantity, threshold }) {
  debug('BUY', pair, quantity);
  if (marketPrice * quantity < threshold) {
    throw new Error("Sorry, marketPrice * quantity should be greater than threshold");
  }
  const response = await binance.marketBuy(pair, quantity);
  debug('  Response', response);
  const { orderId, status } = response;
  console.log(Date.now(), chalk.bgGreen.white(`> BUY ${status} Id ${orderId} :: Quantity ${quantity}`));
  return orderId;
}

module.exports = buyOder;
