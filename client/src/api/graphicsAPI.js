const BASE_URL = "BACKEND_API_URL";

export const getTop5Trending = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/top5graphics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch trending graphics");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

