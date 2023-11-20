// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const communityRoutes = require('./routes/communityRoutes');
const postController = require('./controllers/postController');
const searchController = require('./controllers/searchController');
const testController = require('./controllers/testController');
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// Use routes
app.use('/auth', authRoutes);
app.get('/api/top5graphics', postController.getTopPosts);
app.get('/api/community/getAllPosts', postController.getAllPosts);
app.get('/api/community/getMapsByUsername/:userId', searchController.searchMapByUserName);
app.get('/api/community/getMapsBySearch/:searchText', searchController.searchMapByText);
app.get('/api/community/getIdeas/:searchText', searchController.searchIdeaByText);
app.get('/api/community/getQuestions/:searchText', searchController.searchQuestionByText);
app.post('/api/community/post', postController.writePost)

app.get('/api/test-data', testController.getDataFromTestCollection);

// router.post('/api/community/post', postController.writePost);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.send('Welcome to TerraCanvas!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
