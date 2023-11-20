const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Update user details
router.put('/update/:email', userController.updateUserDetails);

module.exports = router;
