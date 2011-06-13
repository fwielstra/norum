// Some test data, execute these commands in the Mongo console to have some
// data in there.

db.threads.save({postdate : "Sun Jun 12 2011 14:35:26 GMT+0200 (CEST)", author : "henk", title : "test"});
db.threads.find();
// copy / paste the _id property of the added thread into the thread property
// of the following statement:
db.posts.save({thread: ObjectId("4df387f2b160c777ebab4f1d"), date: new Date(), author: 'Hodor', post: 'I maek post'}); 