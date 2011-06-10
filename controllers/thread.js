var Thread = require('../models/thread.js');
exports.post = function(req, res) {
    var newThread = new Thread({title: req.body.title, author: req.body.author});
    newThread.save();
    console.log('New thread ' + newThread.title + ' saved!');
    res.redirect('/');
}
