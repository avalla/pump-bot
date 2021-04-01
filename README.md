# Pump-Bot

A simple bot that helps to take profit in organized crypto pump events.

## Getting started

Install npm modules:

```shell
$ yarn install
```

Create `configuration.yml` file copying `configuration.example.yml` and configure it.

```
thresholds:
  BTC: 0.0001
  USDT: 10
binance:
  api_key: "PUT BINANCE API KEY"
  api_secret: "PUT BINANCE API SECRET"
dry_run: true
defaults:
  profit: 0.5
  stopLoss: 0.2
  total: 11
  main: "USDT"
  secondary: "WIN"
  interval: "30m"
```

Execute program:

```shell
$ yarn start
```

Output:

```
$ yarn start
yarn run v1.22.10
$ node main.js




 /$$$$$$$                                    /$$$$$$$              /$$
| $$__  $$                                  | $$__  $$            | $$
| $$  \ $$ /$$   /$$ /$$$$$$/$$$$   /$$$$$$ | $$  \ $$  /$$$$$$  /$$$$$$
| $$$$$$$/| $$  | $$| $$_  $$_  $$ /$$__  $$| $$$$$$$  /$$__  $$|_  $$_/
| $$____/ | $$  | $$| $$ \ $$ \ $$| $$  \ $$| $$__  $$| $$  \ $$  | $$
| $$      | $$  | $$| $$ | $$ | $$| $$  | $$| $$  \ $$| $$  | $$  | $$ /$$
| $$      |  $$$$$$/| $$ | $$ | $$| $$$$$$$/| $$$$$$$/|  $$$$$$/  |  $$$$/
|__/       \______/ |__/ |__/ |__/| $$____/ |_______/  \______/    \___/
                                  | $$
                                  | $$
                                  |__/

Made in Italy with ❤ :: Version 1.0.0



prompt: Enter candle interval (e.g. 1m, 5m, 1d, 1w, etc):  (30m)
prompt: Enter profit percentage (enter 0.20 for 20%):  (0.5)
prompt: Enter stop-loss percentage (enter 0.1 for 10%):  (0.1)
prompt: How many of main currency (e.g. BTC or USDT):  (10.5)
prompt: Enter main currency (e.g. BTC or USDT):  (USDT)
prompt: Enter seconday currency (e.g. WIN):  (BTT)
1617314257446 Command-line input received:
   Interval:  30m
   Pair:      BTTUSDT
   Total:     10.5
   Profit:    50%
   Stop-loss: 10%
1617314257448 Starting Pump-Bot...
1617314257882 Working with following pair: BTTUSDT
1617314257882 I will spend: 10.4984 USDT for 2000 BTT
1617314258211 > BUY FILLED Id 235875738 :: Quantity 2000
1617314258460 Minimum price in 30m was 0.00523570
1617314258460 Sell price is 0.007854
1617314258460 Calculated stop-loss price 0.004725
  Warning stop-loss order will be lower than threshold so overriding with 0.005001
1617314258712 > SELL :: Quantity 2000
1617314258973 > BALANCE 482.65786924 USDT :: 0.00000000 BTT
Done, exiting...
```

## Logic flow

1. Ask for parameters (amount, currencies, interval, stop-loss, profit)
2. Retrieve market price
3. Calculate quantity (amount / market price)
4. Buy amount at market price
5. Retrieve lower price in last candle
6. Calculate sell price (lower price + profit)
7. Place sell and limit orders

## Known issues

Be sure that total buy, sell and stop-less price are higher than minimum order threshold (should be 10USDT or 0.0001BTC). The software will
do some checks and adjustement, but is better if you manage this values manually.

Examples:

- 10 USDT of investment with 10% stop-loss is wrong, 9 USDT is less than 10 USDT threshold.
- 9 USDT of investment is wrong, 9 USDT is less than 10 USDT threshold.

## Notes

USE AT YOUR OWN RISK!
