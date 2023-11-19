const express = require('express');
const testController = require('../controllers/testController'); // Adjust the path as needed

const router = express.Router();

// Get data from the "Test" collection
router.get('/data', testController.getDataFromTestCollection);

// Add more routes related to the "Test" model as needed

module.exports = router;
