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


module.exports = {
  getUserMapGraphics,
  deleteUserMapGraphic,
  getMemoContent,
};
