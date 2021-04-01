const debug = require('debug')('pump');
const chalk = require('chalk')
async function balance(binance, { main, secondary }) {
  const balances = await binance.balance();
  console.log(Date.now(), chalk.bgGray.white(`> BALANCE ${balances[main].available} ${main} :: ${balances[secondary].available} ${secondary}`));
  return {
    main: balances[main].available,
    secondary: balances[secondary].available
  }
}

module.exports = balance;
