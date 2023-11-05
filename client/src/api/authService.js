import axios from "axios";

const BASE_URL = "BACKEND_API_URL";

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

const register = async (
  firstName,
  lastName,
  email,
  password,
  passwordVerify
) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, {
    firstName,
    lastName,
    email,
    password,
    passwordVerify,
  });
  return response.data;
};

export { getLoggedIn, login, logout, register };
