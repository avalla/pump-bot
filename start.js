const chalk = require('chalk');
const pump = require('./services/pump');

async function start(options) {
  try {
    const { quote, base, total, interval, profit, stopLoss } = options;
    console.log(Date.now(), 'Command-line input received:');
    console.log('   Interval: ', chalk.red.bold(interval));
    console.log('   Pair:     ', chalk.red.bold(`${base}${quote}`));
    console.log('   Total:    ', chalk.red.bold(total));
    console.log('   Profit:   ', chalk.red.bold(`${profit * 100}%`));
    console.log('   Stop-loss:', chalk.red.bold(`${stopLoss * 100}%`));
    console.log(Date.now(), 'Starting Pump-Bot...');
    await pump(options);
  } catch (err) {
    console.log('\n\n');
    console.log('Sorry, there was an error');
    if (err.constructor.name === 'IncomingMessage') {
      console.error('> ', chalk.bgRed.white.bold(err.body), '\n');
      return;
    }
    console.error('> ', chalk.bgRed.white.bold(err), '\n');
  }
  console.log('\nDone, good luck my friend...');
}

module.exports = start;
