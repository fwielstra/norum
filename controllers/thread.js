var Thread = require('../models/thread.js');
exports.post = function(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
    res.redirect('home');
}

exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, article){
        res.send((error) ? error : article);
    })
});
