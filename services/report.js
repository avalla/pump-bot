const chalk = require('chalk');
const round = require('../helpers/round');

function report({ sellPrice, buyPrice, dryRun, quantity, total, stopPrice, quote, base }) {
  console.log();
  console.log(chalk.bold('RESULTS'));
  console.log('  Buy price:   ', chalk.white.bold(`${buyPrice} ${base}`));

  if (sellPrice < buyPrice || dryRun) {
    console.log('  Sell price:  ', chalk.white.bold('MARKET PRICE'));
  } else {
    console.log('  Sell price:  ', chalk.white.bold(`${sellPrice} ${base}`));
    console.log('  Stop price:  ', chalk.white.bold(`${stopPrice} ${base}`));
    const estProfit = round(sellPrice * quantity - total);
    const estLoss = round(total - stopPrice * quantity);
    console.log(
      '  Est. profit: ',
      chalk.white.bold(`${estProfit} ${quote}`),
      `(${Math.round((estProfit / total) * 100)}%)`
    );
    console.log(
      '  Est. loss:   ',
      chalk.white.bold(`${estLoss} ${quote}`),
      `(${Math.round((estLoss / total) * 100)}%)`
    );
  }
}

module.exports = report;
