const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  postDate: Date,
  content: String,
  attachedFile: mongoose.Schema.Types.Mixed,
  interactions: Number,
  postType: String,
  postImages: String,
  postName: String,
  visibility: Number
});

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
