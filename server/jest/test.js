
// Json Modification
// "scripts": {
//   "test": "jest jest/test.js"
// },
//   "jest": {
//     "testEnvironment": "node"
//   },

// test2.js
require('dotenv').config(); // Ensure environment variables are loaded
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path to where your Express app is exported

describe('GET /', () => {
  test('responds with the correct content type', async () => {
    const response = await request(app).get('/');
    // Check if the content-type is HTML, since you're serving a React app
    expect(response.headers['content-type']).toMatch(/html/);
    // If you want to check for specific HTML content, you can do so here
    expect(response.statusCode).toBe(200);
  });

  test('fetches data from the test collection successfully', async () => {
    const response = await request(app).get('/api/test-data');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Successfully Loaded');
    expect(Array.isArray(response.body.data)).toBeTruthy();
    // Add more assertions here if you want to check the structure of the returned documents
  });
});

describe('GET /api/top5graphics', () => {
  test('fetches top 5 liked posts successfully', async () => {
    const response = await request(app).get('/api/top5graphics');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeLessThanOrEqual(5); // The response may have up to 5 posts
    // Check if the posts are sorted by likes in descending order
    if (response.body.length > 1) {
      for (let i = 0; i < response.body.length - 1; i++) {
        expect(response.body[i].likes).toBeGreaterThanOrEqual(response.body[i + 1].likes);
      }
    }
  });
});

// Disconnect from the database after all tests have run
// Replace 'after' with 'afterAll' if you are using Jest
afterAll(function(done) {
  mongoose.disconnect()
    .then(() => done()) // Call done() when the disconnect is successful
    .catch(done); // Pass any errors to done
});
