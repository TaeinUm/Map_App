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