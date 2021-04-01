const debug = require('debug')('pump-bot:tests');
const Trader = require('node-binance-api');
const trading = require('./services/trading');
const binance = new Trader().options();
const configuration = {
  thresholds: {
    USDT: 10,
    BTC: 0.0001,
  },
};

describe('Pump bot tests', () => {
  describe('Stop price', () => {
    it('Stop price #1 - MKT 10 SL 20% QTY 100 => 8', async () => {
      const marketPrice = 10; // 10 USDT
      const stopLoss = 0.2; // 20%
      const quantity = 100;
      const main = 'USDT';
      const options = { marketPrice, stopLoss, quantity, main, configuration };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(8);
    });
    it('Stop price #2 - MKT 0.1 SL 20% QTY 10_000 => 0.08', async () => {
      const marketPrice = 0.1; // 0.1 USDT
      const stopLoss = 0.2; // 20%
      const quantity = 10000;
      const main = 'USDT';
      const options = { marketPrice, stopLoss, quantity, main, configuration };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(0.08);
    });
    it('Stop price #3 - MKT 1 SL 10% QTY 10 => 1', async () => {
      const marketPrice = 1; // 10 USDT
      const stopLoss = 0.1; // 10%
      const quantity = 10;
      const main = 'USDT';
      const options = { marketPrice, stopLoss, quantity, main, configuration };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(1);
    });
    it('Stop price #4 - MKT 0.001 SL 5% QTY 100000 => 1', async () => {
      const marketPrice = 0.001; // 0.001 USDT
      const stopLoss = 0.5; // 5%
      const quantity = 100000;
      const main = 'USDT';
      const options = { marketPrice, stopLoss, quantity, main, configuration };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(0.0005);
    });
  });
  describe('Sell price', () => {
    const interval = '15m';
    const pair = 'WINUSDT';
    it('Sell price #1 - LOW 5 | PROFIT 100% => 10', async () => {
      const profit = 1; // 100%
      binance.setLow(5);
      const options = { pair, profit, interval };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(10);
    });
    it('Sell price #2 - LOW 5 | PROFIT 200% => 15', async () => {
      const profit = 2; // 200%
      binance.setLow(5);
      const options = { pair, profit, interval };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(15);
    });
    it('Sell price #3 - LOW 5 | PROFIT 50% => 7.5', async () => {
      const profit = 0.5; // 50%
      binance.setLow(5);
      const options = { pair, profit, interval };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(7.5);
      binance.setLow(undefined);
    });
    it('Sell price #4 - LOW 10 | PROFIT 100% => 20', async () => {
      binance.setLow(10);
      const profit = 1; // 100%
      const options = { pair, profit, interval };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(20);
    });
    it('Sell price #4 - LOW 0.5 | PROFIT 100% => 1', async () => {
      binance.setLow(0.5);
      const profit = 1; // 100%
      const options = { pair, profit, interval };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(1);
    });
    it('Sell price #5 - LOW 0.05 | PROFIT 25% => 0.625', async () => {
      binance.setLow(0.5);
      const profit = 0.25; // 25%
      const options = { pair, profit, interval };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(0.625);
    });

    // it('Sell price #3', async () => {
    //   binance.setLow(10)
    //   const interval = '15m';
    //   const profit = .5;
    //   const pair = 'WINUSDT';
    //   const options = { pair, profit, interval };
    //   const sellPrice = await trading.sellPrice(binance, options)
    //   expect(sellPrice).toBe(15);
    //   binance.setLow(undefined)
    // });
  });
});
