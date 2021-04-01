# Pump-Bot

A simple bot that helps to take profit in organized pump events for cryptos.

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
  profit: 0.2
  stopLoss: 0.2
  total: 10.5
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

```

USE AT YOUR OWN RISK!
