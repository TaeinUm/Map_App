const mongoose = require("mongoose");
const Comment = require("../models/Comment");

exports.writeComment = async (req, res) => {
  try {
    const { userId, postId, userName, commentContent } = req.body;

    if (!userId || !commentContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      userId,
      postId,
      userName,
      commentDate: new Date(),
      commentContent,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Check if the commentId is valid
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Invalid comment ID" });
    }

    // Find the comment and delete it
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // If no comment was found to delete
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res
      .status(200)
      .json({ message: "Comment deleted successfully", deletedComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;
    await Comment.deleteMany({ postId: postId });
    res.status(200).send({ message: "Post and comments deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting post" });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const posts = await Comment.find({});
    res.json(posts);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Error fetching comments");
  }
};

exports.getAllCommentsByPostID = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const comments = await Comment.find({ postId: postId });
    res.json(comments);
  } catch (error) {
    // Log detailed error information
    console.error("Error fetching comments:", error);
    console.error("Stack Trace:", error.stack);

    // Send a more informative error response to the client, if appropriate
    res.status(500).json({
      message: "Error fetching comments",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
