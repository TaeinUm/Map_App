const express = require('express');
const postController = require('../controllers/postController'); 
const commentController = require('../controllers/commentController'); 
const searchController = require('../controllers/searchController'); 


const router = express.Router();

// Make a post
router.post('/api/community/post', postController.writePost);

router.post('/api/community/postComment', commentController.writeComment);

router.get('/api/community/getMapsByUsername/:userId', searchController.searchMapByUserName);

router.get('/api/community/getQuestions/:searchText', searchController.searchQuestionByTest);

router.get('/api/community/getIdeas/:searchText', searchController.searchIdeaByTest);

router.get('/api/community/getMapsBySearch/:searchText', searchController.searchMapByTest);

router.put('/api/community/likeMap/:postId', postController.likePost)

router.put('/api/community/unlikeMap/:postId', unlikePost)

module.exports = router;