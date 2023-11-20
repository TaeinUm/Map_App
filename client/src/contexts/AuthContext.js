import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn, login, logout, getUserData } from "../api/authAPI";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    // login status from local storage
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [username, setUsername] = useState(""); // User Name
  const [userId, setUserId] = useState(""); // User ID
  const [profileImage, setProfileImage] = useState(null); // User's Profile Image

  const navigate = useNavigate();

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
            setUsername(response.data.username);
            setUserId(response.data.userId);
            setProfileImage(response.data.profileImage);
            localStorage.setItem("isAuthenticated", "true");
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem("useId");
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
      localStorage.setItem("token", response.data.token); // Assuming the token is in the response data
      const data = await getUserData(email);
      localStorage.setItem("userId", data.userId);
      setUserId(data.userId);
      setProfileImage(data.profileImage);
      setUsername(data.username);

      navigate("/"); // Redirect to a protected route after login
    } else {
      console.error("Login failed:", response.message);
    }
  };

  const handleLogout = async () => {
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
