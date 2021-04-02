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



1617393206235 Command-line input received:
   Interval:  5m
   Pair:      WINUSDT
   Total:     10.5
   Profit:    1%
   Stop-loss: 1%
1617393206236 Starting Pump-Bot...
1617393206713 Working with following pair: WINUSDT
1617393206713 I will buy 18655 WIN for 10.5005264 USDT
  pump BUY WINUSDT 18655 +0ms
1617393207031 > BUY FILLED orderId 88772068 :: Quantity 18655.00000000 Total 10.51022700
1617393207310 > BALANCE 482.71350833 USDT :: 18655.00000000 WIN
1617393207557 Minimum price in 5m was 0.00056065
1617393207558 Sell price is 0.000566
1617393207558 Calculated stop-loss price 0.000557
  pump SELL WINUSDT 18655 0.000566 +0ms
1617393208232 > SELL-OCO EXECUTING orderListId 22374158 :: Quantity 18655
1617393208233   > STOP_LOSS_LIMIT NEW orderId 88772090 :: Price 0.00055700
1617393208233   > LIMIT_MAKER     NEW orderId 88772091 :: Price 0.00056600
1617393208233 > SELL :: Quantity 18655
1617393208702 > BALANCE 482.71350833 USDT :: 0.00000000 WIN
1617393208702 Results
1617393208702 Buy price:    0.00056288 WIN
1617393208702 Sell price:   0.000566 WIN
1617393208702 Stop price:   0.000557 WIN
1617393208702 Est. profit:  0.05873 USDT (1%)
1617393208702 Est. loss:    0.109165 USDT (1%)

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
