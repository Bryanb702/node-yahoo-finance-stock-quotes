
'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const yahooQuote = require('./yahooFinanceQuote');

describe('yahooFinanceQuote', function() {
    before (function () {

    });

    it("should return price quote", async function() {

        let symbol = 'AMZN';
        let quote = await yahooQuote.currentPriceQuote(symbol);

        expect(quote.symbol).to.equal(symbol);
        expect (quote).to.have.all.keys(['symbol', 'price'])
    });

    it("should throw a 404 error - invalid symbol", async function() {

        let symbol = 'AMZNTT';
        let quote = await yahooQuote.currentPriceQuote(symbol);

        expect(new Error).to.be.an('error');

    });

    it("should throw a 404 error - empty symbol", async function() {

        let symbol = '';
        let quote = await yahooQuote.currentPriceQuote(symbol);

        expect(new Error).to.be.an('error');

    });
});

