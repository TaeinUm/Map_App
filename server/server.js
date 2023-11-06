require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Include the cors package
const app = express();
const PORT = process.env.PORT || 8080;

// Apply CORS middleware to accept requests from your React app's origin
// This will allow requests from any origin. For production, you should restrict it to specific domains.
app.use(cors());

// Define a schema for the 'test' collection with only an '_id' field
const testSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId // Assuming '_id' is an ObjectId; if it's a string, use String instead
});

// Define the schema for the 'posts' collection
const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  likes: Number,
  image: String,
  title: String
});

// Create a model from the schema
const TestModel = mongoose.model('Test', testSchema, 'test');
const PostModel = mongoose.model('Post', postSchema, 'posts');

// Function to get top 5 liked posts from the 'posts' collection
const getTopPosts = async () => {
  try {
    const topPosts = await PostModel.find({})
      .sort({ likes: -1 }) // Sort by likes in descending order
      .limit(5); // Limit to top 5
    return topPosts;
  } catch (error) {
    console.error('Error fetching top posts:', error);
    throw error;
  }
};

// Route to get top 5 liked posts
app.get('/api/top5graphics', async (req, res) => {
  try {
    const topPostsData = await getTopPosts();
    res.json(topPostsData);
  } catch (error) {
    res.status(500).send('Error fetching top posts');
  }
});


// Function to get data from the 'test' collection
const getDataFromTestCollection = async () => {
  try {
    const data = await TestModel.find({});
    console.log('성공적으로 데이터를 가져왔습니다.'); // Log success message in Korean
    return data;
  } catch (error) {
    console.error('Error fetching data from test collection:', error);
    throw error;
  }
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Test Server
app.get('/', (req, res) => {
  res.send('Welcome to TerraCanvas!');
});

// Route to get data from 'test' collection
app.get('/api/test-data', async (req, res) => {
  try {
    const testData = await getDataFromTestCollection();
    // Send a success message along with the data
    res.json({
      message: '성공적으로 데이터를 가져왔습니다.', // Success message in Korean
      data: testData
    });
  } catch (error) {
    res.status(500).send('Error fetching test data');
  }
});

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handling middleware should be the last piece of middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Only start listening when the file is run directly, not when imported as a module
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
