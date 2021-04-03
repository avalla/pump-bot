const debug = require('debug')('pump');
const chalk = require('chalk');
const { round } = require('../../helpers');

async function marketBuy(binance, { pair, quantity }) {
  debug('BUY', pair, quantity);
  const response = await binance.marketBuy(pair, quantity);
  const { orderId, status, cummulativeQuoteQty, executedQty } = response;
  const buyPrice = round(cummulativeQuoteQty / executedQty);
  console.log(
    Date.now(),
    chalk.bgGreen.white(
      `> MKT BUY ${status} orderId ${orderId} :: Quantity ${executedQty} Total ${cummulativeQuoteQty} (${buyPrice})`
    )
  );
  return { ...response, buyPrice };
}

module.exports = marketBuy;
