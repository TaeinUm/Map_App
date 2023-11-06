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

const register = async (userName, email, password) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, {
    userName,
    email,
    password,
  });
  return response.data;
};

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export { getLoggedIn, login, logout, register };
