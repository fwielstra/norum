
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express.createServer();

var connection = mongoose.connect('mongodb://localhost/norum');

require('./config/environment.js')(app, express);
require('./config/routes.js')(app);

app.listen(3000);
console.log("Express server listening on port %d", app.address().port);
