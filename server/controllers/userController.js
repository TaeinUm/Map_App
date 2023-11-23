const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust the path according to your structure


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


module.exports = {
  updateUserDetails,
};
