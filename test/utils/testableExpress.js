// Allows unit tests to send and receive requests. Example usage:

/*
var express = require('../utils/express.js');
var app = express.createServer();

exports.testHelloWorld = function(test) {
    test.expect(1);
    httputil(app.cgi(), function(server, client) {
        client.fetch('GET', '/', {}, function (resp) {
            test.equals('Hello, world', resp.body);
            test.done();
        });
    });
} 
 */
var express = require('express');

express.HTTPServer.prototype.cgi = function () {
    var self = this;
    return function (req, resp) {
        return self.handle(req, resp);
    }
};

module.exports = express;