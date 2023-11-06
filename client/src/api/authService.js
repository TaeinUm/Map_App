import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const authAPI = async (method, url, data) => {
  try {
    const response = await axios[method](url, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error);
    return {
      success: false,
      message: error?.response?.data?.error || "An error occurred.",
    };
  }
};

const getLoggedIn = async () => {
  return await authAPI("get", `${BASE_URL}/auth/loggedIn`);
};

const login = async (email, password) => {
  return await authAPI("post", `${BASE_URL}/auth/login`, { email, password });
};

const logout = async () => {
  return await authAPI("post", `${BASE_URL}/auth/logout`);
};

const register = async (userName, email, password) => {
  return await authAPI("post", `${BASE_URL}/auth/register`, {
    userName,
    email,
    password,
  });
};

export { getLoggedIn, login, logout, register };
