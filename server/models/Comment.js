const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  postId: mongoose.Schema.Types.ObjectId,
  date: Date,
  content: String
});

const Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;