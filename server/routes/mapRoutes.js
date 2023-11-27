const express = require("express");
const mapController = require("../controllers/mapController");

const router = express.Router();

// Route to get all map graphics for a user
router.get("/:userId/map-graphics", mapController.getUserMapGraphics);

// Route to delete a map graphic
router.delete("/:userId/map-graphics", mapController.deleteUserMapGraphic);

// Route to get memo content of a map graphic
router.get("/:userId/:mapId/memo", mapController.getMemoContent);

// Route to update view setting
router.put("/:userId/view-setting", mapController.updateViewSetting);

// Route to update memo content
router.put("/:userId/:mapId/memo", mapController.updateMemoContent);

// Route to create a new map graphic
router.post("/:userId/map-graphics", mapController.addMapGraphic);

// Route to update an existing map graphic
router.put("/:userId/map-graphics/:mapId", mapController.updateMapGraphic);

// Route to get a specific map graphic
router.get("/:userId/map-graphics/:mapId", mapController.getMapGraphicData);

module.exports = router;
