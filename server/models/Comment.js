const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: Number,
  postId: Number,
  date: Date,
  content: String
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;