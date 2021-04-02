const debug = require('debug')('pump');
const chalk = require('chalk');

async function sellOco(binance, { pair, quantity, sellPrice, stopPrice }) {
  debug('SELL', pair, quantity, sellPrice);

  const response = await binance.sell(pair, quantity, sellPrice, {
    stopPrice,
    stopLimitPrice: stopPrice,
    type: 'OCO',
  });

  const { orderListId, listOrderStatus, orderReports } = response;
  const [stopLossLimit, limitMake] = orderReports;
  console.log(
    Date.now(),
    chalk.bgRed.white(`> SELL-OCO ${listOrderStatus} orderListId ${orderListId} :: Quantity ${quantity}`)
  );
  console.log(
    Date.now(),
    chalk.bgRed.white(
      `  > STOP_LOSS_LIMIT ${stopLossLimit.status} orderId ${stopLossLimit.orderId} :: Price ${stopLossLimit.price}`
    )
  );
  console.log(
    Date.now(),
    chalk.bgRed.white(
      `  > LIMIT_MAKER     ${limitMake.status} orderId ${limitMake.orderId} :: Price ${limitMake.price}`
    )
  );
  return response;
}

module.exports = sellOco;
