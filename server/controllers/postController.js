const mongoose = require("mongoose");
const Post = require("../models/Post");

exports.getTopPosts = async (req, res) => {
  try {
    const topPosts = await Post.find({})
      .sort({ interactions: -1 }) // Sort by likes in descending order
      .limit(5); // Limit to top 5
    res.json(topPosts);
  } catch (error) {
    console.error("Error fetching top posts:", error);
    res.status(500).send("Error fetching top posts");
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    console.log("This is for getting all posts");
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
};

exports.writePost = async (req, res) => {
  try {
    const {
      userId,
      content,
      interactions,
      postType,
      postImages,
      postName,
      visibility,
      attachedFile,
    } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = new Post({
      _id: new mongoose.Types.ObjectId(),
      userId,
      content,
      interactions,
      postType,
      postImages,
      postName,
      visibility,
      attachedFile,
      postDate: new Date(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error); // This will log the full error object
    res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if the postId is valid
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find the post and delete it
    const deletedPost = await Post.findByIdAndDelete(postId);

    // If no post was found to delete
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    // Increment the likes count
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { interactions: 1 } },
      { new: true }
    );
    res.json({ message: "Map liked successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlike a map
exports.unlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    // Decrement the likes count
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { interactions: -1 } },
      { new: true }
    );
    res.json({ message: "Map unliked successfully", updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all the postings
exports.getPostings = async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch postings from the database where the userId matches
    const postings = await Post.find({ userId: userId });

    // Send the postings back to the client
    if (postings.length === 0) {
      res.json([]);
    } else if (postings.length > 0) {
      res.json(postings);
    }
  } catch (error) {
    console.error("Error fetching postings:", error);
    res.status(500).send("Internal Server Error");
  }
};
