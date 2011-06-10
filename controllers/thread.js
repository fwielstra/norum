var Thread = require('../models/thread.js');
exports.post = function(req, res) {
    var newThread = new Thread({title: req.body.title, author: req.body.author});
    newThread.save();
    console.log('New thread ' + newThread.title + ' saved!');
    res.redirect('/thread/' + newThread.title);
}

exports.show = (function(req, res) {
    Thread.findOne({title: req.params.title}, function(error, article){
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log('Returning article ', article);
            res.send(article);
        }
    })
});
