const Trader = require('node-binance-api');
const trading = require('../services/trading');
const binance = new Trader().options();

const BTC_THRESHOLD = 0.0001, 
      USDT_THRESHOLD = 10;

describe('Pump bot tests', () => {
  describe('Stop price', () => {
    it('Stop price #1 - MKT 10 SL 20% QTY 100 => 8', async () => {
      const buyPrice = 10; // 10 USDT
      const stopLoss = 0.2; // 20%
      const quantity = 100;
      const options = { buyPrice, stopLoss, quantity, threshold: USDT_THRESHOLD };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(8);
    });
    it('Stop price #2 - MKT 0.1 SL 20% QTY 10_000 => 0.08', async () => {
      const buyPrice = 0.1; // 0.1 USDT
      const stopLoss = 0.2; // 20%
      const quantity = 10000;
      const options = { buyPrice, stopLoss, quantity, threshold: USDT_THRESHOLD };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(0.08);
    });
    it('Stop price #3 - MKT 1 SL 10% QTY 10 => 1', async () => {
      const buyPrice = 1; // 10 USDT
      const stopLoss = 0.1; // 10%
      const quantity = 10;
      const options = { buyPrice, stopLoss, quantity, threshold: USDT_THRESHOLD };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(1);
    });
    it('Stop price #4 - MKT 0.001 SL 5% QTY 100000 => 1', async () => {
      const buyPrice = 0.001; // 0.001 USDT
      const stopLoss = 0.5; // 5%
      const quantity = 100000;
      const options = { buyPrice, stopLoss, quantity, threshold: USDT_THRESHOLD };
      const stopPrice = await trading.stopPrice(binance, options);
      expect(stopPrice).toBe(0.0005);
    });
  });
  describe('Sell price', () => {
    const interval = '15m';
    const pair = 'WINUSDT';
    it('Sell price #1 - LOW 5 | PROFIT 100% => 10', async () => {
      const profit = 1; // 100%
      const lowPrice = 5;
      const options = { profit, lowPrice };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(10);
    });
    it('Sell price #2 - LOW 5 | PROFIT 200% => 15', async () => {
      const profit = 2; // 200%
      const lowPrice = 5;
      const options = { profit, lowPrice };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(15);
    });
    it('Sell price #3 - LOW 5 | PROFIT 50% => 7.5', async () => {
      const profit = 0.5; // 50%
      const lowPrice = 5;
      const options = { profit, lowPrice };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(7.5);
    });
    it('Sell price #4 - LOW 10 | PROFIT 100% => 20', async () => {
      const profit = 1; // 100%
      const lowPrice = 10;
      const options = { profit, lowPrice };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(20);
    });
    it('Sell price #4 - LOW 0.5 | PROFIT 100% => 1', async () => {
      const profit = 1; // 100%
      const lowPrice = 0.5;
      const options = { profit, lowPrice };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(1);
    });
    it('Sell price #5 - LOW 0.05 | PROFIT 25% => 0.625', async () => {
      const profit = 0.25; // 25%
      const lowPrice = 0.5;
      const options = { profit, lowPrice };
      const sellPrice = await trading.sellPrice(binance, options);
      expect(sellPrice).toBe(0.625);
    });
  });
});
