const Map = require("../models/Map");
const AWS = require("aws-sdk");

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Get user maps
const getUserMapGraphics = async (req, res) => {
  const { userId } = req.params;
  try {
    const maps = await Map.find({ userId: userId });
    // Check if any maps were found
    if (maps.length === 0) {
      return res
        .status(200)
        .json({ message: "No map graphics found for this user" });
    }
    res.json(maps);
  } catch (error) {
    console.error("Error fetching map graphics:", error);
    res.status(500).json({ message: "Error fetching map graphics" });
  }
};

// Delete user maps
const deleteUserMapGraphic = async (req, res) => {
  const { userId, mapId } = req.params;

  try {
    const map = await Map.findOneAndDelete({ _id: mapId, userId: userId });
    if (!map) {
      return res
        .status(404)
        .json({ message: "Map graphic not found or user mismatch" });
    }
    res.status(200).json({ message: "Map graphic deleted successfully" });
  } catch (error) {
    console.error("Error deleting map graphic:", error);
    res.status(500).json({ message: "Error deleting map graphic" });
  }
};

// Update map view setting
const updateViewSetting = async (req, res) => {
  const { userId } = req.params;
  const { settings, accessSetting } = req.body;

  try {
    // Assuming you have a field in your Map model to store these settings
    const updatedMap = await Map.findOneAndUpdate(
      { userId: userId },
      { viewSettings: settings, accessSetting: accessSetting },
      { new: true }
    );
    if (!updatedMap) {
      return res.status(404).json({ message: "Map not found" });
    }
    res.json(updatedMap);
  } catch (error) {
    console.error("Error updating view setting:", error);
    res.status(500).json({ message: "Error updating view setting" });
  }
};

// Get the memo content
const getMemoContent = async (req, res) => {
  const { userId, mapId } = req.params;

  try {
    const map = await Map.findOne({ _id: mapId, userId: userId });
    if (!map) {
      return res.status(404).json({ message: "Map graphic not found" });
    }
    res.json({ memo: map.memo });
  } catch (error) {
    console.error("Error fetching memo content:", error);
    res.status(500).json({ message: "Error fetching memo content" });
  }
};

const updateMemoContent = async (req, res) => {
  const { userId, mapId } = req.params;
  const { memoContent } = req.body;

  try {
    const updatedMap = await Map.findOneAndUpdate(
      { _id: mapId, userId: userId },
      { memo: memoContent },
      { new: true }
    );
    if (!updatedMap) {
      return res.status(404).json({ message: "Map not found" });
    }
    res.json(updatedMap);
  } catch (error) {
    console.error("Error updating memo content:", error);
    res.status(500).json({ message: "Error updating memo content" });
  }
};

// Create map graphic
const addMapGraphic = async (req, res) => {
  const { userId } = req.params;
  const { title, mapType, mapLayer, version, privacy, mapImage } = req.body;

  try {
    let uploadResult = "";
    if (mapImage === "") {
      uploadResult = "https://cdn.hswstatic.com/gif/maps.jpg";
    } else {
      const buffer = Buffer.from(
        mapImage.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const fileType = mapImage.split(";")[0].split("/")[1];

      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `map-images/${userId}-${Date.now()}.${fileType}`,
        Body: buffer,
        ContentType: `image/${fileType}`,
        ACL: "public-read",
      };

      // Upload to S3
      uploadResult = await s3.upload(params).promise();
    }

    const newMap = new Map({
      userId,
      mapName: title,
      mapDate: new Date(),
      mapData: mapLayer,
      memo: "",
      vers: version,
      mapType,
      privacy,
      image: uploadResult.Location,
    });
    await newMap.save();
    res.status(201).json(newMap);
  } catch (error) {
    console.error("Error creating map graphic:", error);
    res.status(500).json({ message: "Error creating map graphic" });
  }
};

// Update map graphic
const updateMapGraphic = async (req, res) => {
  const { userId, mapId } = req.params;
  const { mapType, mapLayer } = req.body;

  try {
    const updatedMap = await Map.findOneAndUpdate(
      { _id: mapId, userId: userId },
      {
        mapType,
        mapData: mapLayer, // Storing mapLayer in mapData field
      },
      { new: true }
    );
    if (!updatedMap) {
      return res.status(404).json({ message: "Map not found" });
    }
    res.json(updatedMap);
  } catch (error) {
    console.error("Error updating map graphic:", error);
    res.status(500).json({ message: "Error updating map graphic" });
  }
};

const getMapGraphicData = async (req, res) => {
  const { userId, mapId } = req.params;

  try {
    const mapGraphic = await Map.findOne({ _id: mapId, userId: userId });
    if (!mapGraphic) {
      return res.status(200).json({ message: "Map graphic not found" });
    }

    console.log(mapGraphic);
    // Check if mapData starts with the S3 URL
    if (mapGraphic.mapData.startsWith("https://terracanvas.s3.")) {
      try {
        const response = await fetch(mapGraphic.mapData);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }

        const jsonData = await response.json();
        mapGraphic.mapData = jsonData;
      } catch (error) {
        console.error("Error fetching JSON from S3:", error);
        return res.json({ mapData: mapGraphic.mapData, error: error.message });
      }
    }

    res.json(mapGraphic);
  } catch (error) {
    console.error("Error fetching map graphic data:", error);
    res.status(500).json({ message: "Error fetching map graphic data" });
  }
};

const storeLoadedMapGraphic = async (req, res) => {
  const { userId } = req.params;
  const { title, version, privacy, mapType, mapLayer, mapImage } = req.body;

  try {
    // Convert mapLayer string to a Buffer for uploading
    const mapLayerBuffer = Buffer.from(mapLayer, "utf-8");

    // Generate a filename for S3
    const fileName = `maps/${userId}-${Date.now()}.json`;

    // thumbnail image
    const buffer = Buffer.from(
      mapImage.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const fileType = mapImage.split(";")[0].split("/")[1];

    // Upload mapLayer to S3
    const s3Response = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: mapLayerBuffer,
        ACL: "public-read",
      })
      .promise();

    // image
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `map-images/${userId}-${Date.now()}.${fileType}`,
      Body: buffer,
      ContentType: `image/${fileType}`,
      ACL: "public-read",
    };

    // Upload the image to S3
    const uploadResult = await s3.upload(params).promise();

    // Create a new map with the S3 URL
    const newMap = new Map({
      userId,
      mapName: title,
      mapDate: new Date(),
      mapData: s3Response.Location,
      memo: "",
      vers: version,
      mapType,
      privacy,
      image: uploadResult.Location,
    });
    await newMap.save();

    res.status(201).json(newMap);
  } catch (error) {
    console.error("Error creating map graphic:", error);
    res.status(500).json({ message: "Error creating map graphic" });
  }
};

module.exports = {
  getUserMapGraphics,
  deleteUserMapGraphic,
  updateViewSetting,
  getMemoContent,
  updateMemoContent,
  addMapGraphic,
  updateMapGraphic,
  getMapGraphicData,
  storeLoadedMapGraphic,
};
