const express = require('express');
const postController = require('../controllers/postController'); // Adjust the path as needed

const router = express.Router();

// Get top posts
router.get('/top', postController.getTopPosts);

// Add more routes related to posts as needed

module.exports = router;
