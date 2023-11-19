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
