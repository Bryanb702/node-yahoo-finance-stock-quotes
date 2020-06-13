
'use strict';

const yahooAPI = require('./lib/yahooFinanceApi');
const yahooQuote = require('./lib/yahooFinanceQuote');

(async () => {

    let quote = {};
    try {

        // Example showing date range
        quote = await yahooAPI.quoteDetail('MSFT', '2019/06/01', '2020/06/09', '1d')
        console.log(quote);

        // Example of extended interval
        quote = await yahooAPI.quoteDetail('MSFT', '2019/06/01', '2020/06/09', '3mo')
        console.log(quote);

        // // Example to get quote details for the current day
        quote = await yahooAPI.quoteDetail('AMZN');
        console.log(quote);

        // Example for getting price only for current date.  There is no logic for weekends
        // so if the current day is Saturday or Sunday or a holiday the quote will not be returned
        quote = await yahooQuote.currentPriceQuote('AMZN');
        console.log(quote);

    } catch (e) {
        console.log(e);
    }
})();
