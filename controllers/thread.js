var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/norum');

var Thread = require('../models/thread.js')(connection);
var Post = require('../models/post.js')(connection);

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
    Thread.findOne({title: req.params.title}, function(error, thread) {
       Post.find({thread: thread._id}, function(error, posts) {
         res.send([{thread: thread, replies: posts}]);
       });
    });
});
