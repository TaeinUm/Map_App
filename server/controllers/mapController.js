const Map = require('../models/Map'); // Adjust the path and model name as needed

// Get user maps
const getUserMapGraphics = async (req, res) => {
  const { userId } = req.params;

  try {
    const map = await Map.find({ userId: userId });
    res.json(map);
  } catch (error) {
    console.error("Error fetching map graphics:", error);
    res.status(500).json({ message: "Error fetching map graphics" });
  }
};

// Delete user maps
const deleteUserMapGraphic = async (req, res) => {
  const { userId } = req.params;
  const { mapId } = req.body;

  try {
    const map = await Map.findOneAndDelete({ _id: mapId, userId: userId });
    if (!map) {
      return res.status(404).json({ message: "Map graphic not found or user mismatch" });
    }
    res.status(200).json({ message: "Map graphic deleted successfully" });
  } catch (error) {
    console.error("Error deleting map graphic:", error);
    res.status(500).json({ message: "Error deleting map graphic" });
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


module.exports = {
  getUserMapGraphics,
  deleteUserMapGraphic,
  getMemoContent,
  updateViewSetting,
};
