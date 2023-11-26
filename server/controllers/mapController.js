const Map = require('../models/Map'); // Adjust the path and model name as needed

const getUserMapGraphics = async (req, res) => {
  const { userId } = req.params;

  try {
    const mapGraphics = await Map.find({ userId: userId });
    res.json(mapGraphics);
  } catch (error) {
    console.error("Error fetching map graphics:", error);
    res.status(500).json({ message: "Error fetching map graphics" });
  }
};

module.exports = {
  getUserMapGraphics,
};
