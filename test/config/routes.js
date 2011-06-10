var suite = require('api-easy').describe('routes');
var assert = require('assert');

// starts the server.
require('../../app.js');

exports.router = suite
    .use('localhost', 3000)
    .discuss('When using the router')
        .get('/')
        .expect('should return a content type of text/html', function(err, res, body) {
            assert.equal("text/html", res.headers['content-type']);
        })
        .expect('should return the contents of the index.html file', function(err, res, body) {
            var contents = require('fs').readFileSync(__dirname +'/../../public/index.html');
            assert.equal(body, contents);
        })
        .next()