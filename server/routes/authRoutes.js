const express = require('express');
const authController = require('../controllers/authController'); // Adjust the path according to your structure

const router = express.Router();

// Register route
router.post('/register', authController.registerUser);

// Login route
router.post('/login', authController.loginUser);

// Logout route
router.post('/logout', authController.logoutUser);

// getLoggedIn route
router.get('/getLoggedIn/:userId', authController.getLoggedIn);

//getUserData route
router.get('/getUserData/:email', authController.getUserData);

module.exports = router;

