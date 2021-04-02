const debug = require('debug')('pump');
const chalk = require('chalk');

async function buyOder(binance, { pair, quantity }) {
  debug('BUY', pair, quantity);
  const response = await binance.marketBuy(pair, quantity);
  const { orderId, status, cummulativeQuoteQty, executedQty } = response;
  console.log(
    Date.now(),
    chalk.bgGreen.white(`> BUY ${status} orderId ${orderId} :: Quantity ${executedQty} Total ${cummulativeQuoteQty}`)
  );
  return response;
}

module.exports = buyOder;
