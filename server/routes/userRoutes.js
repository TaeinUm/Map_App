const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Update user details
router.put('/update/:email', userController.updateUserDetails);

// LoggedIn route
router.get('/loggedIn/:email', userController.checkLoggedIn);

module.exports = router;
