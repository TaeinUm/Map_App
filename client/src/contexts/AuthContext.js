import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  /** 
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
  };*/

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

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
