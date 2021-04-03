const program = require('commander');
const banner = require('./banner');
const {defaults} = require('./configuration');
const pkg = require('./package.json');
const start = require('./start');

console.log(banner);

program.version(pkg.version);

function float(value) {
  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue)) {
    throw new program.InvalidOptionArgumentError('Not a number.');
  }
  return parsedValue;
}

(async function main() {
  program
    .option('-d, --dry-run', "don't execute order")
    .option('-p, --profit <profit>', 'profit, use decimals (for 10% use 0.1)', float, defaults.profit)
    .option('-sl, --stop-loss <stopLoss>', 'stop-loss, use decimals (for 10% use 0.1)', float, defaults.stopLoss)
    .option('-i, --interval <interval>', 'candle interval (e.g. 1m, 5m, 1w)', defaults.interval)
    .option('-q, --quote <quote>', 'quote currency (e.g. BTC, USDT, etc)', defaults.quote || 'BTC')
    .requiredOption('-b, --base <base>', 'base currency (e.g PIVX, etc)')
    .requiredOption('-t, --total <total>', 'total amount that you to risk', float)
    .action(start);
  await program.parseAsync(process.argv);
})();

if (!process.argv.slice(2).length) {
  program.help();
  process.exit();
}
