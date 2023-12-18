const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

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

//change password
//router.put('/updatePassword', userController.updateUserPassword);

module.exports = router;

