const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path according to your structure
const sharp = require('sharp');


// Update user profile image
const updateProfilePicture = async (req, res) => {
  const { userId } = req.params;
  const file = req.file;

  try {
    // Resize the image
    const resizedImageBuffer = await sharp(file.path)
      .resize(100, 100) // Resize to 200x200 pixels or as needed
      .toBuffer();

    // Find the user and update their profile picture
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImage = resizedImageBuffer;
    await user.save();

    res.status(200).json({ message: "Profile picture updated successfully" });
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
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
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
    res.status(500).json({ message: "Error fetching user email: " + error.message });
  }
}

const getUsersByName = async (req, res) => {
  const { searchedUser } = req.params;

  try {
    const users = await User.find({ name: { $regex: searchedUser, $options: 'i' } });
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
