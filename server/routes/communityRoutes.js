const express = require('express');
const postController = require('../controllers/postController'); 
const commentController = require('../controllers/commentController'); 
const searchController = require('../controllers/searchController'); 

const router = express.Router();

//
router.post('/post', postController.writePost);

//
router.post('/poscomment', commentController.writeComment);

//
router.get('/getAllPosts', postController.getAllPosts);

//
router.get('/getMapsByUsername/:userId', searchController.searchMapByUserName);

//
router.post('/postComment', commentController.writeComment);

//
router.get('/getallComments', commentController.getAllComments);

//
router.get('/getAllCommentsByPostID/:postId', commentController.getAllCommentsByPostID);

//
router.get('/getQuestions/:searchText', searchController.searchQuestionByText);

//
router.get('/getIdeas/:searchText', searchController.searchIdeaByText);

//
router.get('/getMapsBySearch/:searchText', searchController.searchMapByText);

//
router.put('/likeMap/:postId', postController.likePost)

//
router.put('/unlikeMap/:postId', postController.unlikePost)

module.exports = router;