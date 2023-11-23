const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path according to your structure
const session = require("express-session");

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      profileImage: "",
    });

    // Save the user to the database
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Error registering user: " + error.message });
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
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving session: " + err.message });
      }
      res.json({ message: "Logged in successfully", userId: user._id });
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in: " + error.message });
  }
};

// Logout a user
const logoutUser = (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({ message: "No active session to log out" });
  }

  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error logging out: " + err.message });
    } else {
      res.json({ message: "Logout successful" });
    }
  });
};

// Check if a user is logged in and return user data
const getUserData = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ loggedIn: true, user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data: " + error.message });
  }
};

// Get logged in user information
const getLoggedIn = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userInfo = {
      userName: user.userName,
      profileImage: user.profileImage,
      userId: user._id,
    };

    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user: " + error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedIn,
  getUserData,
};
