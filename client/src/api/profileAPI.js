// ‘Edit Profile Picture’ button -> Profile image update

// take id, username -> get all of users' postings

// ‘Save Changes’ button -> update Email, username, Password
import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const BASE_URL =
// "http://localhost:8080"
  "https://terracanvas-fb4c23ffbf5d.herokuapp.com" ||  "http://localhost:8080";

const profileAPI = {
  //upate profile image
  updateProfilePicture: async (userId, username, imageData) => {
    const formData = new FormData();
    formData.append("image", imageData);

    try {
      const response = await axios.put(
        `${BASE_URL}/api/users/${userId}/profile-picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: { username },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  },

  //update user details info, if not changed, x change those info
  updateUserDetails: async (userId, newEmail, newUsername, newPassword) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/users/updateDetails/${userId}`, {
        email: newEmail,
        userName: newUsername,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  },

  //update user details info, if not changed, x change those info
  updateUserPassword: async (newEmail, newPassword) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/users/updatePassword`, {
        email: newEmail,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  },

  // Get all postings by userId
  getPostings: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/postings`, {
        params: {
          userId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching postings:", error);
      throw error;
    }
  },

  getEmail: async (userId, username) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/users/${userId}/email`,
        {
          params: {
            username,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data", error);
      throw error;
    }
  },
};

export default profileAPI;
