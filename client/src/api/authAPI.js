import axios from "axios";

const BASE_URL =
  "https://terracanvas-fb4c23ffbf5d.herokuapp.com" ||  "http://localhost:8080";

//const navigate = useNavigate();

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

//get Loggedin status, profile Image, user name, user ID
const getLoggedIn = async (userId) => {
  return await authAPI("get", `${BASE_URL}/auth/getLoggedIn/${userId}`);
};

//get user data
const getUserData = async (email) => {
  return await authAPI("get", `${BASE_URL}/auth/getUserData/${email}`);
};

//update login
const login = async (email, password) => {
  return await authAPI("post", `${BASE_URL}/auth/login`, { email, password });
};

//do logout
const logout = async () => {
  return await authAPI("post", `${BASE_URL}/auth/logout`);
};

//update registered user
const register = async (userName, email, password) => {
  return await authAPI("post", `${BASE_URL}/auth/register`, {
    userName,
    email,
    password,
  });
};

// Set up Axios interceptors for Auth token handling
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//get Loggedin status, profile Image, user name, user ID
const sendEmail = async (OneTime, resetEmail) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/users/send_recovery_email`,
      {
        OTP: OneTime,
        recipient_email: resetEmail,
      }
    );

    //console.log("Am I getting the right data? "+JSON.stringify(response));
    return response.data;
    //   return await CommunitySectionAPI("post", `${API_BASE_URL}/api/community/post/${userId}`,{

    //     postType,
    //     postText,
    //     postFile,
    //     date,

    //   }  );
  } catch (error) {
    console.error("cannot send a password reset email.");
  }
};

export { getLoggedIn, login, logout, register, getUserData, sendEmail };
