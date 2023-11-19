// get Memo Content

// take userId, username, and get user's map graphics' mapImage, mapType, mapLayer, mapLink (이거 4개는 context 저장), and everything

// take name and bring all of those users have that name

// 'share' button -> update vviewSetting (public, private),  Link Access (Anyone with the link, only shared user)
import axios from "axios";

const API_BASE_URL =
  "https://terracanvas-fb4c23ffbf5d.herokuapp.com" || "http://localhost:8080";

const mapServiceAPI = {
  //get user's all saved map graphics
  getUserMapGraphics: async (userId, username) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics`,
        {
          params: { username },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot get data.");
    }
  },

  // delete user's selected map based on mapId (userId, username)
  deleteUserMapGraphic: async (userId, username, mapId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics`,
        {
          data: { username, mapId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting map graphic.");
    }
  },

  //get all of users containing 'name'
  getUsersByName: async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`, {
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.error("cannot get data.");
    }
  },

  //update view setting, accessSetting for user 'share' button
  updateViewSetting: async (userId, username, settings, accessSetting) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/mpagraphics/${userId}/view-setting`,
        {
          params: { username, settings, accessSetting },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot handle setting.");
    }
  },

  // get memo content of a certain map graphics
  getMemoContent: async (userId, username, mapId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mapgraphics/${userId}/${mapId}/memo`,
        {
          params: { username },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching memo content:", error);
    }
  },

  // Update memo content for a specific map graphic
  updateMemoContent: async (userId, username, mapId, memoContent) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/mapgraphics/${userId}/${mapId}/memo`,
        {
          username,
          memoContent,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating memo content:", error);
    }
  },
};

export default mapServiceAPI;
