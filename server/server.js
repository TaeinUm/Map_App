// Load environment variables
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const postRoutes = require('./routes/postRoutes');
const testController = require('./controllers/testController');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { secure: process.env.NODE_ENV === 'production' },
}));

// Route handlers
app.use('/auth', authRoutes); // Authentication routes
app.use('/api', postRoutes); // Post-related routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/community', communityRoutes); // Community-related routes
app.get('/api/test-data', testController.getDataFromTestCollection); // Test data route

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1); // Optionally exit the process if the database connection fails
  });

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to TerraCanvas!');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  // Set the status code based on the error type
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  // Send a detailed error message in development, simpler message in production
  const response = {
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.json(response);
});

// Start the server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express app for testing
module.exports = app;
