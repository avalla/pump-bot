const Binance = require('node-binance-api');
const chalk = require('chalk');
const configuration = require('./configuration');
const pump = require('./services/pump');

async function start(options) {
  try {
    const { quote, base, total, interval, profit, stopLoss, dryRun } = options;

    const binance = new Binance().options({
      APIKEY: configuration.binance.api_key,
      APISECRET: configuration.binance.api_secret,
      verbose: true,
      test: dryRun,
    });

    console.log(Date.now(), 'Command-line input received:');
    console.log('   Interval: ', chalk.red.bold(interval));
    console.log('   Pair:     ', chalk.red.bold(`${base}${quote}`));
    console.log('   Total:    ', chalk.red.bold(total));
    console.log('   Profit:   ', chalk.red.bold(`${profit * 100}%`));
    console.log('   Stop-loss:', chalk.red.bold(`${stopLoss * 100}%`));
    if (options.dryRun) {
      console.log('\n', chalk.red.bold('TEST MODE ENABLED! No order will be done'));
      console.log('\n Warning: Binance will not give any response from API calls', '\n');
    }
    console.log(Date.now(), 'Starting Pump-Bot...');
    // Go on!!
    await pump(binance, options);
  } catch (err) {
    console.log('\n\n');
    console.log('Sorry, there was an error');
    console.log('\n', chalk.red.bold('Please check on binance if there are open orders!!!!'), '\n');
    if (err.constructor.name === 'IncomingMessage') {
      console.error('> ', chalk.bgRed.white.bold(err.body), '\n');
    } else {
      console.error('> ', chalk.bgRed.white.bold(err), '\n');
    }
  }
  console.log('\nDone, good luck my friend...');
}

module.exports = start;
