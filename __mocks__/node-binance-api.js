function Trader() {
  this.options = function () {
    return this;
  };
  this.prices = async function () {
    console.log('Simulating prices');
  };
  this.marketBuy = async function () {
    console.log('Simulating market buy');
    return {
      orderId: 12345678,
      status: 'FILLED',
    };
  };
  this.sell = async function () {
    console.log('Simulating sell');
  };
  this.candlesticks = async function () {
    console.log('Simulating candlesticks');
    const ticks = [
      [
        Date.now(),
        10, // open
        15, // high
        5, // low
        10, // close
      ],
    ];
    return ticks;
  };
}

module.exports = Trader;
