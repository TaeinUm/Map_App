import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn, login } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const isLoggedIn = await getLoggedIn();
        setIsAuthenticated(isLoggedIn.loggedIn);
      } catch (error) {
        console.error("Failed to verify login status:", error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      if (response.message === "Logged in successfully") {
        setIsAuthenticated(true);
        navigate("/"); // Redirect to a protected route after login
      } else {
        // Handle the case where login is not successful
        console.error("Login failed:", response.message);
        // Here you could set an error state and display it in the UI
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Here you could set an error state and display it in the UI
    }
  };
   
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false);
    navigate("/"); // Redirect to the sign-in page
  };  

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
