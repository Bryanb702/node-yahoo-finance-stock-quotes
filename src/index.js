
'use strict';

const yahooAPI = require('./lib/yahooFinanceApi');
const yahooQuote = require('./lib/yahooFinanceQuote');

(async () => {

    let quote = {};
    try {

        // Example showing date range
        // quote = await yahooAPI.quoteDetail('MSFT', '2019/06/01', '2020/06/09', '1d')

        // if (quote) {
        //     console.log(quote);
        // }

        // // Example showing date range
        // quote = await yahooAPI.quoteDetail('MSFT', '2019/06/01', '2020/06/09', '3mo')

        // if (quote) {
        //     console.log(quote);
        // }

        // // Example to get quote details for the current day
        quote = await yahooAPI.quoteDetail('AMZN')

        if (quote) {
            console.log(quote.detail);
        }

        // Example for getting price only.
        quote = await yahooQuote.currentPriceQuote('AMZN');

        console.log(quote);

    } catch (e) {
        console.log('--->' + e);
    }
})();
