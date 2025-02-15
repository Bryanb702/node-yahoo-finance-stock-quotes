
'use strict';

const HttpClient = require('../bin/httpClient');
const appUtils = require('../bin/appUtils');

const httpClient = new HttpClient();

module.exports.quoteDetail = async function(symbol, rangeStart = new Date(), rangeEnd = new Date(), interval = '1d') {

  // Below we add one day to the rangeEnd date as the API returns dates < the rangeEnd date provided.
  const query = {
    period1: Math.floor(new Date(rangeStart).getTime() / 1000),
    period2: Math.floor(new Date(appUtils.addDays(rangeEnd, 1)).getTime() / 1000),
    interval
  }

  let querystring = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

  let url = `${process.env.YAHOO_FINANCE_CHART_URL}/${symbol}?${querystring}`;

  let response = await httpClient.get(url, {});

  if (response instanceof Error) {
    throw response;
  }

  let quoteDetail = {
    meta: response.data.chart.result[0].meta,
    detail: await prettyQuote(response.data.chart.result[0])
  }

  return quoteDetail;

}

// Consolidate the return data into a single array of objects by interval.
async function prettyQuote(result) {

  // Check whether quote data was returned.  If not then return empty array
  if (appUtils.isEmpty(result.indicators.quote[0])) {
    return [];
  }

  let {low, high, close, open, volume } = result.indicators.quote[0];
  let timestamp = result.timestamp;

  // Note that during normal trading hours the close value above reflects the current price and thus
  // it is returned at current rather than close
  let intervalQuote = timestamp.map((item, index) => (
    { timestamp: appUtils.unixToDate(item), 
      open: open[index].toFixed(2), 
      low: low[index].toFixed(2), 
      high: high[index].toFixed(2), 
      current: close[index].toFixed(2),
      volume: volume[index].toFixed(2)
    }));

  return intervalQuote
}
