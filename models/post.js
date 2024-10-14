// post.js
const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postsSchema);

module.exports = Post;
