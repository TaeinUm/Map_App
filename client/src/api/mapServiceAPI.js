// get Memo Content

// take userId, username, and get user's map graphics' mapImage, mapType, mapLayer, mapLink (이거 4개는 context 저장), and everything

// take name and bring all of those users have that name

// 'share' button -> update vviewSetting (public, private),  Link Access (Anyone with the link, only shared user)
import axios from "axios";

const API_BASE_URL =
"https://terracanvas-fb4c23ffbf5d.herokuapp.com" ||  "http://localhost:8080";
  
const mapServiceAPI = {
  //get user's all saved map graphics
  getUserMapGraphics: async (userId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics`
      );
      return response.data;
    } catch (error) {
      console.error("cannot get data.");
    }
  },

  // delete user's selected map based on mapId (userId, username)
  deleteUserMapGraphic: async (userId, mapId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics/${mapId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting map graphic:", error);
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
  updateViewSetting: async (userId, mapId, accessSetting) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/mapgraphics/${userId}/view-setting`,
        {
          params: { mapId, accessSetting },
        }
      );
      return response.data;
    } catch (error) {
      console.error("cannot handle setting.");
    }
  },

  // get memo content of a certain map graphics
  getMemoContent: async (userId, mapId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mapgraphics/${userId}/${mapId}/memo`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching memo content:", error);
    }
  },

  // Update memo content for a specific map graphic
  updateMemoContent: async (userId, mapId, memoContent) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/mapgraphics/${userId}/${mapId}/memo`,
        { memoContent }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating memo content:", error);
    }
  },

  // When we create or load map graphics from modal, we should add map graphics data to DB
  updateUserMapGraphics: async (userId, mapType, mapLayer, mapId = null) => {
    try {
      let response;
      const mapGraphicData = { mapType, mapLayer };

      if (mapId) {
        // If mapId is provided, update existing map graphic
        response = await axios.put(
          `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics/${mapId}`,
          mapGraphicData
        );
      } else {
        // If no mapId, create a new map graphic
        response = await axios.post(
          `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics`,
          mapGraphicData
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error updating/creating map graphic:", error);
    }
  },

  // Get specific map graphic data based on userId and mapId
  getMapGraphicData: async (userId, mapId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics/${mapId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching map graphic data:", error);
    }
  },

  addMapGraphics: async (
    userId,
    mapId,
    title,
    version,
    privacy,
    mapType,
    mapLayer,
    mapImage
  ) => {
    try {
      const mapGraphicData = {
        title,
        version,
        privacy,
        mapType,
        mapLayer,
        mapImage,
      };
      let response;
      {
        /*if (mapId) {
        // Update existing map graphic if mapId is provided
        response = await axios.put(
          `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics/${mapId}`,
          mapGraphicData
        );
      } else if (mapId === null) {
        // Create a new map graphic if no mapId is provided
        response = await axios.post(
          `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics`,
          mapGraphicData
        );
      } */
      }
      response = await axios.post(
        `${API_BASE_URL}/api/mapgraphics/${userId}/map-graphics`,
        mapGraphicData
      );

      return response.data;
    } catch (error) {
      console.error("Error adding map graphic:", error);
      throw error;
    }
  },

  storeLoadedMapGraphic: async (
    userId,
    mapId,
    title,
    version,
    privacy,
    mapType,
    mapLayer,
    mapImage
  ) => {
    try {
      const mapGraphicData = {
        title,
        version,
        privacy,
        mapType,
        mapLayer,
        mapImage,
      };
      let response;
      response = await axios.post(
        `${API_BASE_URL}/api/mapgraphics/${userId}/loaded-map`,
        mapGraphicData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding map graphic:", error);
      throw error;
    }
  },
};

export default mapServiceAPI;
