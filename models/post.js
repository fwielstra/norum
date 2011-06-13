var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var postSchema = new Schema({
     thread: ObjectId
    ,date: {type: Date, default: Date.now}
    ,author: {type: String, default: 'Anon'}
    ,post: String
});

mongoose.model('Post', postSchema);

module.exports = function(db) {
  return db.model('Post');
}
