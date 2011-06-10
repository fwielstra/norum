var test = require('nodeunit');
var httputil = require('nodeunit').utils.httputil;
var express = require('../utils/testableExpress.js');

// set relative require path.
require.paths.unshift('../..');

var app = express.createServer();
var routes = require('config/routes.js')(app);
// todo
/*
exports.testHelloWorld = function(test) {
    test.expect(1);
    httputil(app.cgi(), function(server, client) {
        client.request('POST', '/thread', {}, function (resp) {
            test.equals(JSON.stringify({message: 'y halo thar'}), resp.body);
            test.done();
        });
    });
}*/