require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Test Server
app.get('/', (req, res) => {
  res.send('Welcome to TerraCanvas!');
});

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!');
});

// Only start listening when the file is run directly, not when imported as a module
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Heroku Deployment
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = app;