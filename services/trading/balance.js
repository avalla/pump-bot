const chalk = require('chalk');

async function balance(binance, { quote, base }) {
  const balances = await binance.balance();
  console.log(
    Date.now(),
    chalk.bgGray.white(`> BALANCE ${balances[quote].available} ${quote} :: ${balances[base].available} ${base}`)
  );
  return {
    quote: balances[quote].available,
    base: balances[base].available,
  };
}

module.exports = balance;
