module.exports = function(app, connection) {
  var Thread = require('../models/thread.js')(connection);
  var Post = require('../models/post.js')(connection);

  function post(req, res) {
    var thread = new Thread({title: req.body.title, author: req.body.author}).save();
    console.log('New thread: ', thread);
    res.redirect('home');
  }
  
  function list(req, res) {
    Thread.find(function(err, threads) {
      res.send(threads);
    });
  }
  
  function show(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
      Post.find({thread: thread._id}, function(error, posts) {
        res.send([{thread: thread, replies: posts}]);
      });
    });
  }
  
  // set up routes
  app.post('/thread', post);
  app.get('/thread/:title.:format?', show);
  app.get('/thread', list);
  
  // expose our handler methods so they can be tested.
  return {
    post: post,
    list: list,
    show: show
  };

};

