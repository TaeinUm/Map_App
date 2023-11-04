
// Json Modification
// "scripts": {
//     "test": "jest"
//   },
//   "jest": {
//     "testEnvironment": "node"
//   },



// test2.js
require('dotenv').config(); // Ensure environment variables are loaded
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index'); // Adjust the path to where your Express app is exported

describe('GET /', () => {
  test('responds with Welcome to TerraCanvas!', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Welcome to TerraCanvas!');
  });
});

// Disconnect from the database after all tests have run
afterAll(async () => {
  await mongoose.disconnect();
});
