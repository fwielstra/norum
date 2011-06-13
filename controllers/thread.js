var Thread = require('../models/thread.js');
exports.post = function(req, res) {
    var thread = new Thread({title: req.body.title, author: req.body.author}).save();
    console.log('New thread: ', thread);
    res.redirect('home');
}

exports.list = function(req, res) {
	Thread.find(function(err, threads) {
		res.send(threads);
	});
}

exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread){
        res.send((error) ? error : thread);
    })
});
