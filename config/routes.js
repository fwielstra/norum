var thread = require('../controllers/thread.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        fs = require('fs');

        fs.readFile(__dirname +'/../public/index.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html",'Content-Length':data.length});
            res.write(data);
            res.end();
        });
    });
    
    app.post('/thread', thread.post);
    app.get('/thread/:title', thread.show);
}