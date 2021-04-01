const chalk = require('chalk');
const pkg = require('./package.json');
const configuration = require('./configuration');
const banner = require('./services/banner')
const prompt = require('./services/prompt')(configuration);
const pump = require('./services/pump')(configuration);



(async function () {
  console.log(banner)
  try {
    const result = await prompt();
    const {main, secondary, total, interval, profit, stopLoss} = result;
    const pair = `${secondary}${main}`;
    console.log(Date.now(), 'Command-line input received:');
    console.log('   Interval: ', chalk.red.bold(interval));
    console.log('   Pair:     ', chalk.red.bold(`${secondary}${main}`));
    console.log('   Total:    ', chalk.red.bold(total));
    console.log('   Profit:   ', chalk.red.bold(`${profit * 100}%`));
    console.log('   Stop-loss:', chalk.red.bold(`${stopLoss * 100}%`));
    console.log(Date.now(), 'Starting Pump-Bot...');
    await pump({main, secondary, pair, total, profit, interval, stopLoss});
  } catch (err) {
    console.log('\n\n');
    console.log('Sorry, there was an error');
    if (err.constructor.name === 'IncomingMessage') {
      console.log('> ', chalk.bgRed.white.bold(err.body), '\n');
      return;
    }
    console.log('> ', chalk.bgRed.white.bold(err), '\n');
    // if (process.env.NODE_ENV === 'development') {
    // console.error(err);
    // }
  }
})();
