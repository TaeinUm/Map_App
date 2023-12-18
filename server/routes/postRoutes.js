const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// Get top posts
router.get('/top5graphics', postController.getTopPosts);

// Route to get postings by userId and username
router.get('/postings', postController.getPostings);

module.exports = router;
