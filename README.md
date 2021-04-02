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
defaults:
  profit: 0.5
  stopLoss: 0.2
  interval: "5m"
  quote: "USDT"
```

Getting help:

```shell
$ yarn start --help

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



Usage: program [options]

Options:
  -V, --version                output the version number
  -d, --dry-run                don't execute order
  -p, --profit <profit>        profit percentage, use decimals (for 10% use 0.1) (default: 0.5)
  -sl, --stop-loss <stopLoss>  stop-loss percentage, use decimals (for 10% use 0.1) (default: 0.2)
  -i, --interval <interval>    candle interval (e.g. 1m, 5m, 1w) (default: "5m")
  -q, --quote <quote>          quote currency (e.g. BTC, USDT, etc) (default: "USDT")
  -b, --base <base>            base currency (e.g PIVX, etc)
  -t, --total <total>          total amount that you to risk
  -h, --help                   display help for command

```

Run pump-bot!

```
$ yarn start -b WIN -q USDT -t 10.5 -p 0.01 -sl 0.01

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
                      -> USE AT YOUR OWN RISK <-

1617399628169 Command-line input received:
   Interval:  5m
   Pair:      WINUSDT
   Total:     10.5
   Profit:    2%
   Stop-loss: 1%
1617399628169 Starting Pump-Bot...
1617399628634 > MKT PRICE: 0.00056949
1617399628635 Working with pair WINUSDT threshold is 10.1 USDT
1617399628635 I will buy 18438 WIN for 10.50025662 USDT
1617399628985 > BUY FILLED orderId 88959586 :: Quantity 18438.00000000 Total 10.50007224 (0.000569)
1617399629261 > BALANCE 11.53082040 USDT :: 36908.00000000 WIN
1617399629507 > MIN PRICE in 5m was 0.00056736
1617399629507 > STOP-LOSS PRICE 0.000563
1617399629751 > SELL-OCO EXECUTING orderListId 22387831 :: Quantity 18438
1617399629751   > STOP_LOSS_LIMIT NEW orderId 88959599 :: Price 0.00056300
1617399629751   > LIMIT_MAKER     NEW orderId 88959600 :: Price 0.00057900
1617399630008 > BALANCE 11.53082040 USDT :: 18470.00000000 WIN

RESULTS
  Buy price:    0.000569 WIN
  Sell price:   0.000579 WIN
  Stop price:   0.000563 WIN
  Est. profit:  0.175602 USDT (2%)
  Est. loss:    0.119406 USDT (1%)

Done, good luck my friend...
```

## Logic flow

1. Retrieve market price
2. Calculate quantity (amount / market price)
3. Buy calculated quantity at market price
4. Retrieve lower price in last candle with specified interval
5. Calculate sell price (lower price + profit)
6. Place sell and limit orders

## Known issues

Be sure that total buy, sell and stop-loss prices are higher than minimum order threshold (should be 10USDT or 0.0001BTC). The software will
do some checks and adjustment, but is better if you manage these values manually.

Examples:

- 10 USDT of investment with 10% stop-loss is wrong, 9 USDT is less than 10 USDT threshold.
- 9 USDT of investment is wrong, 9 USDT is less than 10 USDT threshold.

## Donations

- BTC: `1H4KeNvqQcDLKy97DjhhmA2VawxD5SXto3`
- ETC: `0xd0c374846EFfd7cEe32e1c233AF8C58C38Cc03D2`
- XMR: `45GHnspRymU3wagMGwx4vZiPQnBVFDuF3bL7qbfUx1kZajuiGZtVkKdBraPjb1gjTc4GPSvhC8owvPa7smZzmyxAGLh5kjA`

## Notes

USE AT YOUR OWN RISK!
