var thread = require('../controllers/thread.js');

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send({message: 'y halo thar'});
    });
    
    app.post('/thread', thread.post);
}