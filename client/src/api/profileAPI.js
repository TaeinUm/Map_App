// ‘Edit Profile Picture’ button -> Profile image update

// take id, username -> get all of users' postings

// ‘Save Changes’ button -> update Email, username, Password
import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const BASE_URL =
  "https://terracanvas-fb4c23ffbf5d.herokuapp.com" || "http://localhost:8080";

//get postings of the certain users
//check the login status first
export const getPostings = async () => {
  const { isAuthenticated, userId, username } = useContext(AuthContext);

  if (!isAuthenticated) {
    console.error("User is not authenticated");
    return;
  }

  try {
    const response = await axios.get(`${BASE_URL}/api/postings`, {
      params: {
        userId,
        username,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching postings:", error);
    throw error;
  }
};
