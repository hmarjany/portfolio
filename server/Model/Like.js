var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    liked:{type:Boolean},
    userId:{type:String}
});

var Like = mongoose.model('Like', postSchema);
module.exports = Like;