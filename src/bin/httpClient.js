
'use strict';

const Client = require('node-rest-client').Client;

class HttpClient {
  constructor(headers = null) {

    this.client = new Client();

  }

  async get(url, payload) {

    var args = {
      data: payload,
      headers: this.headers,
    };

    return new Promise((resolve, reject) => {

      this.client.get(url, args, function (data, response) {

        let clientResponse = {};

        // parse response body as js object
        if (Buffer.isBuffer(data)) {
          data = data.toString('utf8');
        }

        // Check for good response status code
        if (response.statusCode === 201 || response.statusCode === 200) {

          clientResponse = {
            result: response.statusCode,
            data: data,
            error: null
          }

          resolve(clientResponse);

        } else {

          clientResponse = {
            result: response.statusCode,
            data: null,
            error: data
          }

          reject(clientResponse);
        }

      });
    }).catch(error => { return error });
  }

  async post(url, postData) {

    var args = {
      data: postData,
      headers: this.headers,
    };

    return new Promise((resolve, reject) => {

      this.client.post(url, args, function(data, response) {

        let clientResponse = {};

        // parse response body as js object
        if (Buffer.isBuffer(data)) {
          data = data.toString('utf8');
        }

        // Check for good response status code
        if (response.statusCode === 201 || response.statusCode === 200) {

          clientResponse = {
            result: response.statusCode,
            data: data,
            error: null
          }

          resolve(clientResponse);

        } else {

          clientResponse = {
            result: response.statusCode,
            data: null,
            error: data
          }

          reject(clientResponse);
        }

      });
    }).catch(error => { console.log(error); });
  }

  async patch(url, postData) {

    var args = {
      data: postData,
      headers: this.headers,
    };

    return new Promise((resolve, reject) => {

      this.client.patch(url, args, function(data, response) {

        let clientResponse = {};

        // parse response body as js object
        if (Buffer.isBuffer(data)) {
          data = data.toString('utf8');
        }

        // Check for good response status code
        if (response.statusCode === 201 || response.statusCode === 200) {

          clientResponse = {
            result: response.statusCode,
            data: data,
            error: null
          }

          resolve(clientResponse);

        } else {

          clientResponse = {
            result: response.statusCode,
            data: null,
            error: data
          }

          reject(clientResponse);
        }

      });
    }).catch(error => { console.log(error); });
  }
}

module.exports = HttpClient;
