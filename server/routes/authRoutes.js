const express = require('express');
const userController = require('../controllers/userController'); // Adjust the path according to your structure

const router = express.Router();

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Logout route
router.post('/logout', userController.logoutUser);

// LoggedIn route
router.get('/loggedIn', userController.checkLoggedIn);

module.exports = router;
