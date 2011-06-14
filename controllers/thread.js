module.exports = function(app, Thread, Post) {

  function post(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save();
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
  
  // set up this controller's routes and callback methods.
  app.post('/thread', post);
  app.get('/thread/:title.:format?', show);
  app.get('/thread', list);
};

