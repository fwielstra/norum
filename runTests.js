require.paths.push(__dirname);
require.paths.push(__dirname + '/deps');
require.paths.push(__dirname + '/lib');
var testrunner = require('nodeunit').reporters.default;

process.chdir(__dirname);
//testrunner.run([]);

console.log('Please run "vows test/*/*", not sure how to run tests in a different way at the moment.');