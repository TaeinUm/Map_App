// get Memo Content

// take userId, username, and get user's map graphics' mapImage, mapType, mapLayer, mapLink (이거 4개는 context 저장), and everything

// take name and bring all of those users have that name

// 'share' button -> update vviewSetting (public, private),  Link Access (Anyone with the link, only shared user)
import axios from "axios";

const API_BASE_URL =
  "https://terracanvas-fb4c23ffbf5d.herokuapp.com" || "http://localhost:8080";

const mapServiceAPI = {
  //get user's all saved map graphics
  getUserMapGraphics: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/user/${userId}/map-graphics`
      );
      return response.data;
    } catch (error) {
      console.error("cannot get data.");
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
  updateViewSetting: async (userId, settings, accessSetting) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/user/${userId}/view-setting`,
        {
          params: { settings, accessSetting },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot handle setting.");
    }
  },

  // get memo content of a certain map graphics
  getMemoContent: async (userId, mapType, mapLayer) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/user/${userId}/memo`,
        {
          params: { mapType, mapLayer },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot handle setting.");
    }
  },
};

export default mapServiceAPI;
