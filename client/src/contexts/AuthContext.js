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
<<<<<<< HEAD
        const isLoggedIn = await getLoggedIn();
        setIsAuthenticated(isLoggedIn.loggedIn);
=======
        const { success, data } = await getLoggedIn();
        setIsAuthenticated(success && data.isAuthenticated);
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(success && data.isAuthenticated)
        );
>>>>>>> 4b14c89b0a7015763cdbc8e0e4d429d3393db5fa
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 4b14c89b0a7015763cdbc8e0e4d429d3393db5fa

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
