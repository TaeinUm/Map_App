const express = require('express');
const mapController = require('../controllers/mapController');

const router = express.Router();

// Route to get all map graphics for a user
router.get('/api/mapgraphics/:userId/map-graphics', mapController.getUserMapGraphics);

module.exports = router;
