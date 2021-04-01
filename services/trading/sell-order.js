const debug = require('debug')('pump');
const chalk = require('chalk')

async function sellOrder(binance, { pair, quantity, sellPrice, stopPrice, threshold }) {
  debug('SELL', pair, quantity, sellPrice);

  if (sellPrice* quantity < threshold) {
    throw new Error("Sorry, sellPrice * quantity should be greater than threshold");
  }
  const response = await binance.order('SELL', pair, quantity, sellPrice, {
    stopPrice,
    stopLimitPrice: stopPrice,
    type: 'OCO',
  });
  debug('  Response', response);
  const { orderId, status } = response;
  console.log(Date.now(), chalk.bgRed.white(`> SELL :: Quantity ${quantity}`));
  return orderId;
}

module.exports = sellOrder;
