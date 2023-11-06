const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path according to your structure
const session = require('express-session');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
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
});

/* 
// Login route
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user && await bcrypt.compare(req.body.password, user.password)) {
        // Create session
        req.session.userId = user._id;
        res.json({ message: "Logged in successfully" });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
*/

// Login route
router.post('/login', async (req, res) => {
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
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(400).json({ message: "Unable to log out" });
        } else {
            res.json({ message: "Logout successful" });
        }
    });
});

// LoggedIn route
router.get('/loggedIn', (req, res) => {
    if (req.session.userId) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
