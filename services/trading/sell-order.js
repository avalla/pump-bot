const debug = require('debug')('pump');

async function sellOrder(binance, { pair, quantity, sellPrice }) {
  debug('SELL', pair, quantity, sellPrice);
  const response = await binance.sell(pair, quantity, sellPrice);
  debug('  Response', response);
  const { orderId, status } = response;
  console.log(Date.now(), `SELL: ${status} - Id ${orderId} :: Quantity ${quantity}`);
  return orderId;
}

module.exports = sellOrder;
