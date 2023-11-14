import axios from "axios";

const BASE_URL = "https://terracanvas-fb4c23ffbf5d.herokuapp.com" || "http://localhost:8080";

export const getTop5Trending = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/top5graphics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching top graphics:", error);
    throw error;
  }
};
