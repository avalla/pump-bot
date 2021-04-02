const program = require('commander');
const banner = require('./banner');
const configuration = require('./configuration');
const pkg = require('./package.json');
const start = require('./start');

console.log(banner);

program.version(pkg.version);

function float(value) {
  // parseInt takes a string and a radix
  const parsedValue = parseFloat(value, 10);
  if (isNaN(parsedValue)) {
    throw new program.InvalidOptionArgumentError('Not a number.');
  }
  return parsedValue;
}

(async function main() {
  program
    .option('-d, --dry-run', "don't execute order")
    // .option('-v, --verbose', 'add more information')
    .option(
      '-p, --profit <profit>',
      'profit percentage, use decimals (for 10% use 0.1)',
      float,
      configuration.defaults.profit
    )
    .option(
      '-sl, --stop-loss <stopLoss>',
      'stop-loss percentage, use decimals (for 10% use 0.1)',
      float,
      configuration.defaults.stopLoss
    )
    .option('-i, --interval <interval>', 'candle interval (e.g. 1m, 5m, 1w)', configuration.defaults.interval)
    .option('-q, --quote <quote>', 'quote currency (e.g. BTC, USDT, etc)', configuration.defaults.quote || 'BTC')
    .requiredOption('-b, --base <base>', 'base currency (e.g PIVX, etc)')
    .requiredOption('-t, --total <total>', 'total amount that you to risk', float)
    .action(start);
  await program.parseAsync(process.argv);
})();

if (!process.argv.slice(2).length) {
  program.help();
  process.exit();
}
