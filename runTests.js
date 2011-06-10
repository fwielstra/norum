require.paths.push(__dirname);
require.paths.push(__dirname + '/deps');
require.paths.push(__dirname + '/lib');
var testrunner = require('nodeunit').reporters.default;

process.chdir(__dirname);
testrunner.run(['test/config', 'test/controllers']);