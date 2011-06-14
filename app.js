var express = require('express');
var app = module.exports = express.createServer();

require('./config/environment.js')(app, express);
require('./config/routes.js')(app);

app.listen(3000);

console.log("Express server listening on port %d", app.address().port);
console.log("Settings: ", app.settings);
