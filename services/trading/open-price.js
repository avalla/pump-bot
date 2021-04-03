const chalk = require('chalk');
const format = require('date-fns/format')
const addHours = require('date-fns/addHours')

async function openPrice(binance, {pair}) {

  const ticks = await binance.candlesticks(pair, "1h", undefined, {
    limit: 1,
    startTime: format(addHours(Date.now(), -24), 'T'),
    endTime: Date.now(),
  });

  const [tick] = ticks;
  const [time, open, high, low, close] = tick;


  console.log(Date.now(), chalk.bgGray.white(`> OPEN PRICE 24hours ago was ${open}`));
  return open;
}

module.exports = openPrice;
