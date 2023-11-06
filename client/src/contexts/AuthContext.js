import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn, login, logout } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await getLoggedIn();
      if (response.success) {
        setIsAuthenticated(response.data.loggedIn);
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
      // Here you could set an error state and display it in the UI
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
      // Here you could set an error state and display it in the UI
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
