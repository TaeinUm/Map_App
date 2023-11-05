const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Add other fields as required
});

const User = mongoose.model('User', userSchema);

module.exports = User;
