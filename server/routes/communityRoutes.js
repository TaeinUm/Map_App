const express = require("express");
const multer = require("multer");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const searchController = require("../controllers/searchController");
const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Write a comment
router.post("/postcomment", commentController.writeComment);

// Get all comments
router.get("/getallComments", commentController.getAllComments);

// Remove comments
router.delete("/deleteComment/:commentId", commentController.deleteComment);

// Remove all comments
router.delete("/deleteAllComment/:postId", commentController.deleteCommentsByPostId);

// Remove post
router.delete("/deletePost/:postId", postController.deletePost);

// Get all comments regarding postID
router.get("/getAllCommentsByPostID/:postId", commentController.getAllCommentsByPostID);

// Write a post
router.post("/post", postController.writePost);

// Get all posts
router.get("/getAllPosts", postController.getAllPosts);

// Get all posts regarding postID
router.get("/getMapsByUsername/:userIden", searchController.searchMapByUserName);

router.put(
    "/:postId/upload-post-picture", // endpoint URL change
    upload.single("postImage"), // upload to S3 bucket
    postController.uploadPostPicture
);

// Get Question Post by title Text Matched
router.get("/getQuestions/:searchText", searchController.searchQuestionByText);

// Get Idea Post by title Text Matched
router.get("/getIdeas/:searchText", searchController.searchIdeaByText);

// Get Map Post by title Text Matched
router.get("/getMapsBySearch/:searchText", searchController.searchMapByText);

// Like Post
router.post("/newlikePost/:postId", postController.newlikePost);

// UnLike Post
router.put("/unlikeMap/:postId", postController.unlikePost);

router.put("/likeMap/:postId", postController.likePost);

router.get("/:postType/:postId", searchController.getPostDetailsFromDatabase);

module.exports = router;
