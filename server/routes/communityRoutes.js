const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB models
const Post = require('../models/Post'); 
const Comment = require('../models/Comment'); 

// Make a post
router.post('/api/community/post', async (req, res) => {
    try {
        const { likes, image, title } = req.body;
        const newPost = new Post({
            _id: new mongoose.Types.ObjectId(),
            userId,
            postId,
            content,
            likes,
            types,
            image,
            title
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/api/community/postComment', async (req, res) => {
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
});

router.get('/api/community/getMapsByUsername/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const maps = await Post.find({ 
            userId: userId,
            types: "map"
        });
        res.json(maps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get questions by search text
router.get('/api/community/getQuestions/:searchText', async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const questions = await Post.find({ 
            title: { "$regex": searchText, "$options": "i" },
            types: "question"
        });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ideas by search text
router.get('/api/community/getIdeas/:searchText', async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const ideas = await Post.find({ 
            title: { "$regex": searchText, "$options": "i" },
            types: "idea"
        });
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get maps by search text
router.get('/api/community/getMapsBySearch/:searchText', async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const maps = await Post.find({ 
            title: { "$regex": searchText, "$options": "i" },
            types: "map"
        });
        res.json(maps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



// Like a map
router.put('/api/community/likeMap/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        // Increment the likes count
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { likes: 1 } },
            { new: true }
        );
        res.json({ message: 'Map liked successfully', updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Unlike a map
router.put('/api/community/unlikeMap/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        // Decrement the likes count
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { likes: -1 } },
            { new: true }
        );
        res.json({ message: 'Map unliked successfully', updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;