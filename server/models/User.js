const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: Buffer, required: false },
  // Add any other user profile fields here
});

const User = mongoose.model('Profile', userSchema);

module.exports = User;
