import axios from "axios";

const BASE_URL =
  "http://localhost:8080";

//get 5 trending map graphics for Home page
export const getTop5Trending = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/top5graphics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top graphics:", error);
    throw error;
  }
};
