const Pump = require('node-binance-api');
const chalk = require('chalk');
const trading = require('./trading');
const { round } = require('../helpers');
const configuration = require('../configuration');

async function pump(options) {
  const { quote, base, total, profit, stopLoss, interval, dryRun } = options;
  const pair = `${base}${quote}`;
  const binance = new Pump().options({
    APIKEY: configuration.binance.api_key,
    APISECRET: configuration.binance.api_secret,
    verbose: true,
    test: dryRun,
  });
  if (dryRun) {
    console.log('\n  ', chalk.red.bold('TEST MODE ENABLED! No order will be done'), '\n');
  }
  const threshold = configuration.thresholds[quote];

  const marketPrice = await trading.marketPrice(binance, { pair });
  const quantity = Math.ceil(total / marketPrice);

  console.log(Date.now(), 'Working with following pair:', chalk.red.bold(pair));
  console.log(
    Date.now(),
    'I will buy',
    chalk.red.bold(`${quantity} ${base}`),
    'for',
    chalk.red.bold(`${marketPrice * quantity} ${quote}`)
  );

  if (marketPrice * quantity < threshold) {
    throw new Error('Sorry, marketPrice * quantity should be greater than threshold');
  }
  const { buyPrice = marketPrice } = await trading.marketBuy(binance, {
    pair,
    marketPrice,
    quantity,
    configuration,
    threshold,
  });
  await trading.balance(binance, { quote, base });

  const lowPrice = await trading.lowPrice(binance, { pair, interval });
  const sellPrice = await trading.sellPrice(binance, { pair, profit, lowPrice, quantity });
  const stopPrice = await trading.stopPrice(binance, { buyPrice, stopLoss, quantity, threshold });
  if (sellPrice < buyPrice) {
    console.log(
      Date.now(),
      '  Warning sellPrice is lower than buyPrice',
      chalk.red.bold(`${sellPrice} < ${buyPrice}`),
      'I will sell at market price'
    );
  }
  if (sellPrice < buyPrice || dryRun) {
    console.log(Date.now(), '  Warning OCO order is not working in test mode, I will sell at market price');
    await trading.marketSell(binance, { pair, quantity });
  } else {
    if (sellPrice * quantity < threshold) {
      throw new Error(
        'Sorry, sellPrice * quantity should be greater than threshold. SELL ORDER NOT DONE CHECK MANUALLY!'
      );
    }
    await trading.sellOco(binance, { pair, quantity, sellPrice, threshold, stopPrice });
  }

  await trading.balance(binance, { quote, base });

  // trovate prezzo di acquisto in seguito all'ordine

  console.log(Date.now(), 'Results');
  console.log(Date.now(), 'Buy price:   ', chalk.red.bold(`${buyPrice || marketPrice} ${base}`));
  if (sellPrice < buyPrice || configuration.dry_run) {
    console.log(Date.now(), 'Sell price:  ', chalk.red.bold('MARKET PRICE'));
  } else {
    console.log(Date.now(), 'Sell price:  ', chalk.red.bold(`${sellPrice} ${base}`));
    console.log(Date.now(), 'Stop price:  ', chalk.red.bold(`${stopPrice} ${base}`));
    const estProfit = round(sellPrice * quantity - total);
    const estLoss = round(total - stopPrice * quantity);
    console.log(
      Date.now(),
      'Est. profit: ',
      chalk.red.bold(`${estProfit} ${quote}`),
      `(${Math.round((estProfit / total) * 100)}%)`
    );
    console.log(
      Date.now(),
      'Est. loss:   ',
      chalk.red.bold(`${estLoss} ${quote}`),
      `(${Math.round((estLoss / total) * 100)}%)`
    );
  }
}

module.exports = pump;
