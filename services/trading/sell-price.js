const chalk = require('chalk');
const { round } = require('../../helpers');

async function calculateSellPrice(binance, { profit, lowPrice }) {
  const sellPrice = round(lowPrice * (1 + profit));
  console.log(
    Date.now(),
    chalk.bgGray.white(`> SELL PRICE ${sellPrice}`)
  );
  return sellPrice;
}

module.exports = calculateSellPrice;
