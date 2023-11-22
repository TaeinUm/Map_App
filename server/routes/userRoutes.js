const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Adjust the destination as needed


// Update profile picture
router.put('/:userId/profile-picture', upload.single('image'), userController.updateProfilePicture);

// Update user details
router.put('/:userId', userController.updateUserDetails);

// Route to get posts


// Route to get email by userId
router.get('/api/users/:userId/email', userController.getEmail);

module.exports = router;
