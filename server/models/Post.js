const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: Number,
  postId: Number,
  likes: Number,
  types: String,
  image: String,
  title: String
});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
