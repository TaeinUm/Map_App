const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path according to your structure
const AWS = require('aws-sdk');
const path = require('path');
const fs = require('fs');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Update user profile image
const updateProfilePicture = async (req, res) => {
  const { userId } = req.params;
  const file = req.file;

  try {
    // Generate a filename
    const fileName = `profileImages/${userId}-${Date.now()}${path.extname(file.originalname)}`;

    // Upload to S3
    const s3Response = await s3.upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileName,
      Body: fs.createReadStream(file.path),
      ACL: 'public-read' // or another ACL as per your requirements
    }).promise();

    // Find the user and update their profile picture URL
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImage = s3Response.Location;
    await user.save();

    // Delete the local file after uploading to S3
    fs.unlinkSync(file.path);

    res.status(200).json({ message: "Profile picture updated successfully", imageUrl: s3Response.Location });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Error updating profile picture: " + error.message });
  }
};

// Update user details
const updateUserDetails = async (req, res) => {
  const { userId } = req.params;
  const { email, userName, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if they are provided
    if (email) user.email = email;
    if (userName) user.userName = userName;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    const updatedUser = await user.save();
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user: " + error.message });
  }
};

const getEmail = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.query;

    // Fetch user's email from the database
    const user = await User.findOne({ _id: userId, userName: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the email back to the client
    res.json({ email: user.email });
  } catch (error) {
    console.error("Error fetching user email:", error);
    res
      .status(500)
      .json({ message: "Error fetching user email: " + error.message });
  }
};

const getUsersByName = async (req, res) => {
  const { searchedUser } = req.params;
  const regexPattern = String(searchedUser);
  try {
    const users = await User.find({
      userName: { $regex: regexPattern, $options: "i" },
    });
    // Check if any users were found
    if (users.length === 0) {
      return res.status(200).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = {
  updateProfilePicture,
  updateUserDetails,
  getEmail,
  getUsersByName,
};
