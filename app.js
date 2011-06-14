var express = require('express');
var app = module.exports = express.createServer();

// set up the environment (used filters, public folder location, etc)
require('./config/environment.js')(app, express);

// set up the connection to Mongo.
var mongoose = require('mongoose');
// TODO: probably want to make this an external configuration parameter,
// and/or different for dev, test and production.
var connection = mongoose.connect('mongodb://localhost/norum');

// set up our models, to be passed to our controllers. This is so we can
// mock the Thread and Post model for the controller's unit test.
// Not too happy with this setup at the moment.
var Thread = require('./models/thread.js')(connection);
var Post = require('./models/post.js')(connection);

// set up the basic route to /, which returns the contents of the index.html file.
require('./config/routes.js')(app);

// set up the thread controller, passing it the thread and post models.
require('./controllers/thread.js')(app, Thread, Post);

// start the server.
app.listen(3000);

console.log("Express server listening on port %d", app.address().port);
console.log("Settings: ", app.settings);
