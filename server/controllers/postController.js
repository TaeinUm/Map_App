const mongoose = require("mongoose");
const Post = require("../models/Post");
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');
const nodemailer = require("nodemailer");
const multer = require('multer');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();
const { v4: uuidv4 } = require('uuid');

exports.uploadPostPicture = async (req, res) => {
  const { postId } = req.params;
  const { imageBase64 } = req.body;

  try {
    if (!imageBase64) {
      return res.status(400).json({ message: "No image data provided" });
    }

    // Base64 문자열을 버퍼로 변환
    const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");
    const fileType = imageBase64.split(";")[0].split("/")[1];

    const fileKey = `postImages/${postId}-${Date.now()}.${fileType}`;
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Body: buffer,
      ContentType: `image/${fileType}`,
      ACL: 'public-read',
    };

    const uploadResult = await s3.upload(params).promise();

    // 업로드된 이미지 URL만 반환
    res.status(200).json({ message: "Post image uploaded successfully", imageUrl: uploadResult.Location });
  } catch (error) {
    console.error("Error uploading post image:", error);
    res.status(500).json({ message: "Error uploading post image: " + error.message });
  }
};

exports.getTopPosts = async (req, res) => {
  try {
    const topPosts = await Post.find({ postType: 'map' })
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
      userName,
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
      userName,
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
    console.error(error);
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

exports.newlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId; 

    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid post ID or user ID" });
    }

    console.log("TEST")
    console.log(postId)
    console.log(userId)

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);
    const update = isLiked
      ? { $pull: { likes: userId } } 
      : { $push: { likes: userId } }; 

    const updatedPost = await Post.findByIdAndUpdate(postId, update, { new: true });
    res.json({
      message: isLiked ? "Like removed successfully" : "Like added successfully",
      updatedPost
    });
  } catch (error) {
    console.error("Error in likePost:", error);
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
