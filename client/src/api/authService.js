import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const getLoggedIn = async () => {
  const response = await axios.get(`${BASE_URL}/auth/loggedIn`);
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${BASE_URL}/auth/logout`);
  return response.data;
};

const register = async (name, userName, email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, {
    name,
    userName,
    email,
    password,
  });
  return response.data;
};

export { getLoggedIn, login, logout, register };
