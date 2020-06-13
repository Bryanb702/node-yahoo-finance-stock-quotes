# node-yahoo-finance-stock-quotes
Provides APIs to call Yahoo finance chart API and a screen scraper of the Yahoo Finance Quote page.  Should probably be made 
into an npm library.

##  index.js provided to give example calls

## usage
This is the more robust call which allows for retrieving current trading day information as well as historical information.  This
method calls the Yahoo Finance chart API

const yahooAPI = require('yahoo-finance-api');
yahooAPI.getQuote(symbol, startDate, endDate, interval);

symbol is the stock ticker symbol to lookup
startDate is the starting date for which to retrieve historical data
endDate is the end date for which to retrieve historical data
interval is the interval on which to summarize data.  For valid values see validRanges in the response below. Understanding
the rollups associated with intervals can be tricky but it works.

## result

{
  meta: {
    currency: 'USD',
    symbol: 'MSFT',
    exchangeName: 'NMS',
    instrumentType: 'EQUITY',
    firstTradeDate: 511108200,
    regularMarketTime: 1591732801,
    gmtoffset: -14400,
    timezone: 'EDT',
    exchangeTimezoneName: 'America/New_York',
    regularMarketPrice: 189.8,
    chartPreviousClose: 123.68,
    priceHint: 2,
    currentTradingPeriod: { pre: [Object], regular: [Object], post: [Object] },
    dataGranularity: '3mo',
    range: '',
    validRanges: [
      '1d',  '5d',  '1mo',
      '3mo', '6mo', '1y',
      '2y',  '5y',  '10y',
      'ytd', 'max'
    ]
  },
  detail: [
    {
      timestamp: 2019-06-01T04:00:00.000Z,
      open: '123.85',
      low: '119.01',
      high: '141.68',
      current: '137.86',
      volume: '1577338300.00'
    },
    {
      timestamp: 2019-09-01T04:00:00.000Z,
      open: '136.61',
      low: '133.22',
      high: '152.50',
      current: '151.38',
      volume: '1414440000.00'
    },
    {
      timestamp: 2019-12-01T05:00:00.000Z,
      open: '151.81',
      low: '146.65',
      high: '190.70',
      current: '162.01',
      volume: '1896317300.00'
    },
    {
      timestamp: 2020-03-01T05:00:00.000Z,
      open: '165.31',
      low: '132.52',
      high: '187.51',
      current: '183.25',
      volume: '3286229900.00'
    },
    {
      timestamp: 2020-06-01T04:00:00.000Z,
      open: '182.54',
      low: '181.35',
      high: '188.55',
      current: '188.36',
      volume: '182554400.00'
    },
    {
      timestamp: 2020-06-09T20:00:01.000Z,
      open: '188.00',
      low: '187.26',
      high: '190.70',
      current: '189.80',
      volume: '28820688.00'
    }
  ]
}

## const yahooQuote = require('yahho-finance-quote')

This call will retrieve the current price only for the provided symbol.  This method calls the Yahoo Finance web page and scrapes the
current price

Example call

yahooQuote.currentPriceQuote('AMZN')

##result: 
    { symbol: 'AMZN', price: 2600.86 }



