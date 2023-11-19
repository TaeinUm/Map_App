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

const writePost = async (req, res) => {
  try {
      const { likes, image, title } = req.body;
      const newPost = new Post({
          _id: new mongoose.Types.ObjectId(),
          userId,
          postId,
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