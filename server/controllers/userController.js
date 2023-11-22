const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path according to your structure
const session = require('express-session');

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      profileImage: ""
    });

    // Save the user to the database
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ message: "Email does not exist" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }
    // User is authenticated, create session
    req.session.userId = user._id;
    res.json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout a user
const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(400).json({ message: "Unable to log out" });
    } else {
      res.json({ message: "Logout successful" });
    }
  });
};

// Check if a user is logged in and return user data
const checkLoggedIn = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ loggedIn: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  try {
    const { email } = req.params;
    const { newEmail, newUsername, newPassword } = req.body;

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.email = newEmail || user.email;
    user.userName = newUsername || user.userName;
    if (newPassword) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Save the updated user
    await user.save();

    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkLoggedIn,
  updateUserDetails,
};
