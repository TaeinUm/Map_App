import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn, login, logout } from "../api/authAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    // login status from local storage
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [username, setUsername] = useState(""); // User Name
  const [userId, setUserId] = useState(""); // User ID
  const [profileImage, setProfileImage] = useState(""); // User's Profile Image

  const navigate = useNavigate();

  //UseEffect for getting login status, username, userID, and user profile image
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await getLoggedIn();
      if (response.success) {
        setIsAuthenticated(response.data.loggedIn); //Update Login Status
        setUsername(response.data.username); // Update username
        setUserId(response.data.userId); // Update userId
        setProfileImage(response.data.profileImage); // Update profile image
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false");
      }
    };

    if (!isAuthenticated) {
      checkLoggedIn();
    }
  }, [isAuthenticated]);

  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    if (response.success) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", response.data.token); // Assuming the token is in the response data
      navigate("/"); // Redirect to a protected route after login
    } else {
      console.error("Login failed:", response.message);
    }
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
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
