const debug = require('debug')('pump');
const chalk = require('chalk');

async function marketSell(binance, { pair, quantity }) {
  debug('SELL', pair, quantity);

  const response = await binance.marketSell(pair, quantity);
  const { orderId, status, executedQty, cummulativeQuoteQty } = response;
  console.log(
    Date.now(),
    chalk.bgRed.white(`> MKT SELL ${status} orderId ${orderId} :: Quantity ${executedQty} Total ${cummulativeQuoteQty}`)
  );
  return orderId;
}

module.exports = marketSell;
