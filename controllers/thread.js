module.exports = function(app, Thread, Post) {

  function post(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save(function(error) {
      res.end(error);
    });
  }
  
  function list(req, res) {
    Thread.find(function(err, threads) {
      res.send(threads);
    });
  }
  
  function show(req, res) {
    Thread.findOne({title: req.params.title}, function(error, thread) {
      if (error) {
        res.send(error);
        return;
      }
      Post.find({thread: thread._id}, function(error, posts) {
        res.send([{thread: thread, replies: posts}]);
      });
    });
  }
  
  function reply(req, res) {
    //console.log(req);
    //console.log(req.body);
    // first, make sure the thread exists.
    Thread.findById(req.body.threadid, function(error, thread) {
      if (error || thread == null) {
        res.send(error || 'Thread with ID ' + req.body.threadid + ' not found.');
        return;
      }
      new Post({thread: thread._id, author: req.body.author, post: req.body.post}).save(function(error) {
        res.end();
      });
    });
  }
  
  // set up this controller's routes and callback methods.
  app.post('/thread', post);
  app.get('/thread/:title.:format?', show);
  app.get('/thread', list);
  app.post('/thread/reply', reply);
};

