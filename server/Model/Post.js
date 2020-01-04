var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    caption: { type: String, required: true },
    comments: [{ authur: String, userId: String, comment: String }],
    image: { type: String, require: true },
    userId: {type: String, required: true},
    updated: { type: Date, default: Date.now },
    like:[{liked: Boolean, userId: String}]
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;