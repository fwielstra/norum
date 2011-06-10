module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send({message: 'y halo thar'});
    });
}