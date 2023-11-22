const mongoose = require('mongoose');
const Comment = require('../models/Comment');

exports.writeComment = async (req, res) => {
    try {
        const { userId, postId, date, content } = req.body;
       
        if (!userId || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const newComment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            userId,
            postId,
            date,
            content
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const posts = await Comment.find({}); 
        res.json(posts); 
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Error fetching comments');
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
        console.error('Error fetching comments:', error);
        console.error('Stack Trace:', error.stack);

        // Send a more informative error response to the client, if appropriate
        res.status(500).json({
            message: 'Error fetching comments',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};