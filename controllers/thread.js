module.exports = function(app, Thread, Post) {

  function post(req, res) {
    new Thread({title: req.body.title, author: req.body.author}).save(function(error) {
        console.log('New thread "%s" created by %s', req.body.title, req.body.author);
      res.end(error);
    });
  }
  
  function list(req, res) {
      console.log('Listing threads...');
    Thread.find(function(err, threads) {
        console.log('Returning %d threads', threads.length);
      res.send(threads);
    });
  }
  
  function show(req, res) {
      
    Thread.findOne({title: req.params.title}, function(error, thread) {
      if (error) {
        res.send(error);
        return;
      }
      
      console.log('Thread %s found, finding posts for threadid %s', thread.title, thread._id);
      Post.find({thread: thread._id}, function(error, posts) {
          console.log('%d posts found for thread %s', posts.length, thread.title);
        res.send([{thread: thread, replies: posts}]);
      });
    });
  }
  
  function reply(req, res) {
    // first, make sure the thread exists.
    Thread.findById(req.body.threadid, function(error, thread) {
      if (error || thread == null) {
          console.log('Thread with ID %s not found', req.body.threadid);
        res.send(error || 'Thread with ID ' + req.body.threadid + ' not found.');
        return;
      }
      new Post({thread: thread._id, author: req.body.author, post: req.body.post}).save(function(error) {
       if (error) {
           console.log(error);
       }
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

