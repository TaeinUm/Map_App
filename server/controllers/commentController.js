const Comment = require('../models/Comment');

exports.writeComment = async (req, res) => {
    try {
        const { userId, postId, content } = req.body;
        const newComment = new Comment({
            _id: new mongoose.Types.ObjectId(),
            userId,
            postId,
            content
        });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
