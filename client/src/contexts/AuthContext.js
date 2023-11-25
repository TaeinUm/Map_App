import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn, login, logout, getUserData } from "../api/authAPI";
import {
  setUserID,
  setAuthentified,
  CommunitySectionAPI,
} from "../api/CommunitySectionAPI";
import { CommunityContext } from "./CommunityContextVerTwo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // login status from local storage
  // JSON.parse(localStorage.getItem("isAuthenticated")) || false
  //);
  const [username, setUsername] = useState(""); // User Name
  const [userId, setUserId] = useState(""); // User ID
  const [profileImage, setProfileImage] = useState(null); // User's Profile Image

  const navigate = useNavigate();
  //const {doAuthenitication, doUserID} = CommunitySectionAPI;
  //const {updateUserID} = CommunityContext;

  //UseEffect for getting login status, username, userID, and user profile image
  useEffect(() => {
    const checkLoggedIn = async () => {
      const storedAuthStatus =
        localStorage.getItem("isAuthenticated") === "true";
      const storedUserId = localStorage.getItem("userId");

      if (storedAuthStatus && storedUserId) {
        try {
          const response = await getLoggedIn(storedUserId);
          if (response.success) {
            setIsAuthenticated(true);
            setUsername(response.data.userName);
            setProfileImage(response.data.profileImage);
            localStorage.setItem("isAuthenticated", "true");
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("userId");
            localStorage.removeItem("isAuthenticated");
          }
        } catch (error) {
          console.error("Error checking login status:", error);
          setIsAuthenticated(false);
          localStorage.removeItem("userId");
          localStorage.removeItem("isAuthenticated");
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    if (response.success) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("authentification", "true");
      localStorage.setItem("token", response.data.token); // Assuming the token is in the response data

      const data = await getUserData(email);
      const aLotOfData = data.data;
      const userProps = aLotOfData.user;
      const userId = userProps._id;

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("newUserid", userId);

      setUserId(data.userId);
      localStorage.setItem("userId", userId);
      setProfileImage(data.profileImage);
      setUsername(data.username);

      navigate("/"); // Redirect to a protected route after login
    } else {
      console.error("Login failed:", response.message);
    }
  };

  const handleLogout = async () => {
    localStorage.clear();
    const response = await logout();
    if (response.success) {
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", "false");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } else {
      console.error("Logout failed:", response.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        handleLogout,
        username,
        userId,
        profileImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
