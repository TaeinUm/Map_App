const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Adjust the destination as needed

// Update profile picture
router.put(
  "/:userId/profile-picture",
  upload.single("image"),
  userController.updateProfilePicture
);

// Update user details
router.put("/:userId", userController.updateUserDetails);

// Route to get email by userId
router.get("/:userId/email", userController.getEmail);

// Route to get users by name
router.get("/:searchedUser", userController.getUsersByName);

router.post("/send_recovery_email", userController.sendEmail);

module.exports = router;
