const express = require('express');
const postController = require('../controllers/postController'); 
const commentController = require('../controllers/commentController'); 
const searchController = require('../controllers/searchController'); 

const router = express.Router();

// Write a comment
router.post('/postcomment', commentController.writeComment);

// Get all comments
router.get('/getallComments', commentController.getAllComments);

// Remove comments
router.delete('/deleteComment/:commentId', commentController.deleteComment);

// Remove post
router.delete('/deletePost/:postId', postController.deletePost);

// Get all comments regarding postID
router.get('/getAllCommentsByPostID/:postId', commentController.getAllCommentsByPostID);

// Write a post
router.post('/post', postController.writePost);

// Get all posts
router.get('/getAllPosts', postController.getAllPosts);

// Get all posts regarding postID
router.get('/getMapsByUsername/:userIden', searchController.searchMapByUserName);

// Get Question Post by title Text Matched
router.get('/getQuestions/:searchText', searchController.searchQuestionByText);

// Get Idea Post by title Text Matched
router.get('/getIdeas/:searchText', searchController.searchIdeaByText);

// Get Map Post by title Text Matched
router.get('/getMapsBySearch/:searchText', searchController.searchMapByText);

// Like Post
router.put('/likeMap/:postId', postController.likePost)

// UnLike Post
router.put('/unlikeMap/:postId', postController.unlikePost)

module.exports = router;