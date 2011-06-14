require.paths.push(__dirname);
require.paths.push(__dirname + '/deps');
require.paths.push(__dirname + '/lib');
var testrunner = require('nodeunit').reporters.default;

process.chdir(__dirname);
testrunner.run(['test/controllers/thread.js']);

console.log('Please run "vows test/API/*" to run integration tests.');