const express = require("express");
const multer = require("multer");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const searchController = require("../controllers/searchController");
const upload = multer({ dest: "uploads/" }); // Adjust the destination as needed
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
    "/:postId/upload-post-picture", // 엔드포인트 URL 변경
    upload.single("postImage"), // 이 부분은 이미지 필드명을 맞춰야 합니다.
    postController.uploadPostPicture // 엔드포인트 컨트롤러 함수 변경
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
