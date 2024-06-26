const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Update profile picture
router.put("/:userId/profile-picture", upload.single("image"), userController.updateProfilePicture);

// Update user details
router.put("/updateDetails/:userId", userController.updateUserDetails);

router.put("/updatePassword", userController.updateUserPassword);

// Route to get email by userId
router.get("/:userId/email", userController.getEmail);

// Route to get users by name
router.get("/:searchedUser", userController.getUsersByName);

router.post("/send_recovery_email", userController.sendEmail);

module.exports = router;
