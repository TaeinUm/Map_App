const Post = require('../models/Post');


exports.getTopPosts = async (req, res) => {
  try {
    const topPosts = await Post.find({})
      .sort({ likes: -1 }) // Sort by likes in descending order
      .limit(5); // Limit to top 5
    res.json(topPosts);
  } catch (error) {
    console.error('Error fetching top posts:', error);
    res.status(500).send('Error fetching top posts');
  }
};

exports.getAllPosts = async (req, res) => {
  try {
      const posts = await Post.find({}); // 모든 포스트 검색
      res.json(posts); // 검색된 포스트 반환
  } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).send('Error fetching posts');
  }
};

const writePost = async (req, res) => {
  try {
      const { userId, content, likes, types, image, title } = req.body;
      const newPost = new Post({
          _id: new mongoose.Types.ObjectId(),
          userId,
          content,
          likes,
          types,
          image,
          title
      });
      await newPost.save();
      res.status(201).json(newPost);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
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
};

// Unlike a map
const unlikePost = async (req, res) => {
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
};

// module.exports = {
//   writePost
// };