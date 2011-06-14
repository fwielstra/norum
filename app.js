var express = require('express');
var app = module.exports = express.createServer();

// set up the environment (used filters, public folder location, etc)
require('./config/environment.js')(app, express);

// set up the connection to Mongo.
var mongoose = require('mongoose');
// TODO: probably want to make this an external configuration parameter,
// and/or different for dev, test and production.
var connection = mongoose.connect('mongodb://localhost/norum');

// set up the routes
require('./config/routes.js')(app);
require('./controllers/thread.js')(app, connection);

// start the server.
app.listen(3000);

console.log("Express server listening on port %d", app.address().port);
console.log("Settings: ", app.settings);
