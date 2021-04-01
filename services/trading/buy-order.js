const debug = require('debug')('pump');

async function buyOder(binance, { pair, marketPrice, quantity, configuration }) {
  debug('BUY', pair, quantity);
  // TODO: check if marketPrice * quantity lower than threshold
  const response = await binance.marketBuy(pair, quantity);
  debug('  Response', response);
  const { orderId, status } = response;
  console.log(Date.now(), `BUY: ${status} - Id ${orderId} :: Quantity ${quantity}`);
  return orderId;
}

module.exports = buyOder;
