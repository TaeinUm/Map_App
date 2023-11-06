import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn, login, logout } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const navigate = useNavigate();

  /** We need to change this into backend HTTP-only cookie for security!  */
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { success, data } = await getLoggedIn();
        setIsAuthenticated(success && data.isAuthenticated);
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(success && data.isAuthenticated)
        );
      } catch (error) {
        console.error("Failed to get loggin status:", error);
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false");
      }
    };

    if (!isAuthenticated) {
      checkLoggedIn();
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { success, data } = await login(email, password);
      if (success && data) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else {
        console.error("Login Failed.");
        alert("Failed to log in.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to loginn due to an error.");
    }
  };

  /** 
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };*/

  const handleLogout = async () => {
    try {
      const { success } = await logout();
      if (success) {
        setIsAuthenticated(false);
        localStorage.setItem("isAuthenticated", "false");
        navigate("/");
      } else {
        console.error("Logout failed.");
        alert("Failed to logout.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout due to an error.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
