const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB models
const Post = require('../models/Post'); // Adjust path and model as per your setup
const Comment = require('../models/Comment'); // Adjust path and model as per your setup
const Map = require('../models/Map'); // Adjust path and model as per your setup
const Question = require('../models/Question'); // Adjust path and model as per your setup
const Idea = require('../models/Idea'); // Adjust path and model as per your setup
const Map = require('../models/Map'); // Adjust path and model as per your setup


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

// Get maps by username
router.get('/api/community/getMapsByUsername/:username', async (req, res) => {
    try {
        const maps = await Map.find({ username: req.params.username });
        res.json(maps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get questions by search text
router.get('/api/community/getQuestions/:searchText', async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const questions = await Question.find({ "questionText": { "$regex": searchText, "$options": "i" } });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get ideas by search text
router.get('/api/community/getIdeas/:searchText', async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const ideas = await Idea.find({ "ideaText": { "$regex": searchText, "$options": "i" } });
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get maps by search text
router.get('/api/community/getMapsBySearch/:searchText', async (req, res) => {
    try {
        const searchText = req.params.searchText;
        const maps = await Map.find({ "mapTitle": { "$regex": searchText, "$options": "i" } });
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
