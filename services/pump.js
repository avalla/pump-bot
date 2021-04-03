const chalk = require('chalk');
const trading = require('./trading');
const report = require('./report');
const configuration = require('../configuration');
const {round} = require('../helpers')

async function pump(binance, options) {
  const {quote, base, total, profit, stopLoss, interval, dryRun} = options;
  const pair = `${base}${quote}`;
  const threshold = configuration.thresholds[quote];

  const marketPrice = await trading.marketPrice(binance, {pair});
  const quantity = Math.ceil(total / marketPrice);

  console.log(
    Date.now(),
    'Working with pair',
    chalk.white.bold(pair),
    'threshold is',
    chalk.white.bold(`${threshold} ${quote}`),
  );
  console.log(
    Date.now(),
    'I will buy',
    chalk.white.bold(`${quantity} ${base}`),
    'for',
    chalk.white.bold(`${marketPrice * quantity} ${quote}`),
  );

  if (marketPrice * quantity < threshold) {
    throw new Error('Sorry, marketPrice * quantity should be greater than threshold');
  }
  const {buyPrice = marketPrice} = await trading.marketBuy(binance, {pair, quantity});
  await trading.balance(binance, {quote, base});

  const lowPrice = await trading.lowPrice(binance, {pair, interval});
  const openPrice = await trading.openPrice(binance, {pair});

  console.log(Date.now(), '  Current variation is', chalk.white.bold(`${round(((marketPrice/openPrice)-1)*100, 2)}%`));
  const sellPrice = await trading.sellPrice(binance, {profit, lowPrice});
  const stopPrice = await trading.stopPrice(binance, {buyPrice, stopLoss, quantity, threshold});
  if (dryRun) {
    console.log(Date.now(), '  Warning OCO order is not working in test mode');
  }

  if (sellPrice < buyPrice) {
    console.log('  Warning sellPrice is lower than buyPrice', chalk.white.bold(`${sellPrice} < ${buyPrice}`));
  }

  if (sellPrice < buyPrice || dryRun) {
    await trading.marketSell(binance, {pair, quantity});
  } else {
    if (sellPrice * quantity < threshold) {
      throw new Error(
        'Sorry, sellPrice * quantity should be greater than threshold. SELL ORDER NOT DONE!! CHECK MANUALLY!',
      );
    }
    await trading.sellOco(binance, {pair, quantity, sellPrice, stopPrice});
  }

  await trading.balance(binance, {quote, base});

  // trovate prezzo di acquisto in seguito all'ordine

  report({sellPrice, buyPrice, dryRun, quantity, total, stopPrice, quote, base});
}

module.exports = pump;
