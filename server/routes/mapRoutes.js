const express = require('express');
const mapController = require('../controllers/mapController');

const router = express.Router();

// Route to get all map graphics for a user
router.get('/:userId/map-graphics', mapController.getUserMapGraphics);

// Route to delete a map graphic
router.delete('/:userId/map-graphics', mapController.deleteUserMapGraphic);

// Route to get memo content of a map graphic
router.get('/:userId/:mapId/memo', mapController.getMemoContent);

module.exports = router;
