const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path according to your structure
const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Update user profile image
const updateProfilePicture = async (req, res) => {
  const { userId } = req.params;
  const file = req.file;

  try {
    // Generate a filename
    const fileName = `profileImages/${userId}-${Date.now()}${path.extname(
      file.originalname
    )}`;

    // Upload to S3
    const s3Response = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fs.createReadStream(file.path),
        ACL: "public-read",
      })
      .promise();

    // Find the user and update their profile picture URL
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profileImage = s3Response.Location;
    await user.save();

    // Delete the local file after uploading to S3
    fs.unlinkSync(file.path);

    res
      .status(200)
      .json({
        message: "Profile picture updated successfully",
        imageUrl: s3Response.Location,
      });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res
      .status(500)
      .json({ message: "Error updating profile picture: " + error.message });
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
      //await user.save();
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

// Update user details
const updateUserPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userArray = await User.find({ email: email });
    if (!userArray) {
      return res.status(404).json({ message: "User not found" });
    }
    let actualUser = userArray[0];
    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
      actualUser.password = hashedPassword;
    }

    const updatedUser = await actualUser.save();
    // Save the updated user
    //const updatedUser = await User.updateOne({email: user.email}, { $set: { password: hashedPassword } });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating user: " + error.message,
        change: password,
      });
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

const sendEmail = async (req, res) => {
  const { recipient_email, OTP } = req.body;
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "KODING 101 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
            <html lang="en" >
            <head>
              <meta charset="UTF-8">
              <title>CodePen - OTP Email Template</title>
              

            </head>
            <body>
            <!-- partial:index.partial.html -->
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
              <div style="margin:50px auto;width:70%;padding:20px 0">
                <div style="border-bottom:1px solid #eee">
                  <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Koding 101</a>
                </div>
                <p style="font-size:1.1em">Hi,</p>
                <p>Thank you for choosing Koding 101. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                <p style="font-size:0.9em;">Regards,<br />Koding 101</p>
                <hr style="border:none;border-top:1px solid #eee" />
                <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                  <p>Koding 101 Inc</p>
                  <p>1600 Amphitheatre Parkway</p>
                  <p>California</p>
                </div>
              </div>
            </div>
            <!-- partial -->
              
            </body>
            </html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.error("Error!: ", error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
};

module.exports = {
  updateProfilePicture,
  updateUserDetails,
  getEmail,
  getUsersByName,
  sendEmail,
  updateUserPassword,
};
