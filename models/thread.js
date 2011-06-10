var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = new Schema({
    title:  String,
    postdate: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'}
});

module.exports = mongoose.model('Thread', threadSchema);
