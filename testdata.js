// Some test data, execute these commands in the Mongo console to have some
// data in there.

var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/norum');

var Thread = require('./models/thread.js')(connection);
var Post = require('./models/post.js')(connection);

var thread = new Thread({
  postdate : "Sun Jun 12 2011 14:35:26 GMT+0200 (CEST)",
  author : "henk",
  title : "test-2"
});

// hacky.
var postsSaved = 0;
var callback = function() {
  postsSaved++;
  if (postsSaved == 3) {
    console.log('All done, added a new thread and posts:', thread);
    process.exit(0);
  }
}

thread.save(function(error) {
  var now = new Date();
  new Post({thread: thread._id, postdate: now, author: 'Hodor', post: 'Hodor hodor hodor.'}).save(callback);
  new Post({thread: thread._id, postdate: now, author: 'Hodor', post: 'Hodor, hodor hodor hodor.'}).save(callback);
  new Post({thread: thread._id, postdate: now, author: 'Hodor', post: 'Hodor! HODOR HODOR HODOR HODOR!'}).save(callback);
});



