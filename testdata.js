// Some test data, execute these commands in the Mongo console to have some
// data in there.


db.threads.save({
  postdate : "Sun Jun 12 2011 14:35:26 GMT+0200 (CEST)",
  author : "henk",
  title : "test-2"
});

db.threads.find();
// copy / paste the objectid of the inserted thread and chuck it into these posts.
var now = new Date();
db.posts.save({thread: ObjectId("4df646a9875a5d23ed8df40c"), postdate: now, author: 'Hodor', post: 'Hodor hodor hodor'});
db.posts.save({thread: ObjectId("4df646a9875a5d23ed8df40c"), postdate: now, author: 'Hodor', post: 'Hodor, hodor hodor hodor.'});
db.posts.save({thread: ObjectId("4df646a9875a5d23ed8df40c"), postdate: now, author: 'Hodor', post: 'Hodor! HODOR HODOR HODOR HODOR!'});
