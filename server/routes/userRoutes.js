const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Adjust the destination as needed


// Update profile picture


// Update user details
router.put('/:userId', userController.updateUserDetails);

// Route to get email by userId
router.get('/:userId/email', userController.getEmail);


module.exports = router;
