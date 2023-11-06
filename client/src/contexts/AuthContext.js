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
        setIsAuthenticated(isLoggedIn);
      } catch (error) {
        console.error("Failed to verify login status:", error);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      if (data) {
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  /** 
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };*/

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
