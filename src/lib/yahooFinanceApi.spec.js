
'use strict';

const chai = require('chai');
const chaiAspromised = require('chai-as-promised');
const expect = chai.expect;
const sinon = require('sinon');

chai.use(chaiAspromised);

const yahooApi = require('./yahooFinanceApi');

describe('yahooFinanceApi', function() {
    before (function () {

    });

    it("should return quote with one of detail", async function() {

        let symbol = 'AMZN';
        let quote = await yahooApi.quoteDetail(symbol, '2020/06/10', '2020/06/10', '1d');

        expect(quote.meta.symbol).to.equal(symbol);
        expect(quote.detail).to.have.length(1);

        // Check the details object contain all expected properties
        expect (quote.detail[0]).to.have.all.keys(['timestamp', 'open', 'low', 'high', 'current', 'volume'])
    });

    it("should return quote with four rows of detail", async function() {

        let symbol = 'MSFT';
        let quote = await yahooApi.quoteDetail(symbol, '2020/06/05', '2020/06/10', '1d');

        expect(quote.meta.symbol).to.equal(symbol);
        expect(quote.detail).to.have.length(4);
    });

    it("should return quote with four rows of detail - no interval provided", async function() {

        let symbol = 'MSFT';
        let quote = await yahooApi.quoteDetail(symbol, '2020/06/05', '2020/06/10');

        expect(quote.meta.symbol).to.equal(symbol);
        expect(quote.detail).to.have.length(4);
    });

    // This test will fail when run on weekends and holidays
    it("should accept symbol name only and return current quote", async function() {

        let symbol = 'MSFT';
        let quote = await yahooApi.quoteDetail(symbol);

        expect(quote.meta.symbol).to.equal(symbol);
        expect(quote.detail).to.have.length(1);
    });

    it("should throw error - no parameters provided", async function() {

        let symbol = 'MSFT';

        await expect(yahooApi.quoteDetail()).to.be.rejected;
        await expect(yahooApi.quoteDetail()).to.be.rejectedWith('Request response error');

    });

    it("should throw error - missing period date", async function() {

        let symbol = 'ADBE';

        await expect(yahooApi.quoteDetail(symbol, '2020/06/05', '1d')).to.be.rejected;
        await expect(yahooApi.quoteDetail()).to.be.rejectedWith('Request response error');
    });
});

