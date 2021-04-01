const Pump = require('node-binance-api');
const chalk = require('chalk');
const debug = require('debug')('pump');
const trading = require('./trading');
const {round} = require('../helpers');

// async function currentTrades(binance, { pair }) {}
//
// async function allOrders(binance, { pair }) {
//   const orders = await binance.allOrders(pair);
//   console.log('Orders', orders);
// }

function start(configuration) {
  const binance = new Pump().options({
    APIKEY: configuration.binance.api_key,
    APISECRET: configuration.binance.api_secret,
    verbose: true,
    test: configuration.dry_run,
  });
  return async function start({main, secondary, pair, total, profit, stopLoss, interval}) {
    // await trading.balance(binance, { main, secondary })
    if (configuration.dry_run) {
      console.log('\n  ', chalk.red.bold('TEST MODE ENABLED! No order will be done'), '\n');
    }
    const threshold = configuration.thresholds[main];

    const marketPrice = await trading.marketPrice(binance, {pair});
    const quantity = 2000 //Math.ceil(total / marketPrice);


    console.log(Date.now(), 'Working with following pair:', chalk.red.bold(pair));
    console.log(Date.now(), 'I will spend:', chalk.red.bold(`${marketPrice*quantity} ${main}`), 'for', chalk.red.bold(`${quantity} ${secondary}`));

    await trading.buyOrder(binance, {pair, marketPrice, quantity, configuration, threshold});
    // await trading.balance(binance, { main, secondary })

    const lowPrice = await trading.lowPrice(binance, {pair, interval});
    const sellPrice = await trading.sellPrice(binance, {pair, profit, lowPrice, quantity});
    const stopPrice = await trading.stopPrice(binance, {marketPrice, stopLoss, quantity, threshold});
    await trading.sellOrder(binance, {pair, quantity, sellPrice, threshold, stopPrice});
    await trading.balance(binance, { main, secondary })



    // console.log(Date.now(), 'Market price:', chalk.red.bold(`${marketPrice} ${secondary}`));
    // console.log(Date.now(), 'Sell price:  ', chalk.red.bold(`${sellPrice} ${secondary}`));
    // console.log(Date.now(), 'Stop price:  ', chalk.red.bold(`${stopPrice} ${secondary}`));
    // console.log(Date.now(), 'Est. profit: ', chalk.red.bold(`${round(sellPrice * quantity - total)} ${main}`));
    // console.log(Date.now(), 'Est. loss:   ', chalk.red.bold(`${round(total - stopPrice * quantity)} ${main}`));

    // await trading.stopOrder(binance, {pair, quantity, stopPrice});

    // await allOrders(binance, { pair });
    console.log('Done, exiting...');
  };
}

module.exports = start;
