
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
const app = require('../server'); // Adjust the path to where your Express app is exported

describe('GET /', () => {
  test('responds with the correct content type', async () => {
    const response = await request(app).get('/');
    // Check if the content-type is HTML, since you're serving a React app
    expect(response.headers['content-type']).toMatch(/html/);
    // If you want to check for specific HTML content, you can do so here
  });

  test('fetches data from the test collection successfully', async () => {
    const response = await request(app).get('/api/test-data');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', '성공적으로 데이터를 가져왔습니다.');
    expect(Array.isArray(response.body.data)).toBeTruthy();
    // Add more assertions here if you want to check the structure of the returned documents
  });
});

describe('GET /api/top-posts', () => {
  test('fetches top 5 liked posts successfully', async () => {
    const response = await request(app).get('/api/top-posts');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(5); // Assuming there are at least 5 posts in the database
    // Check if the posts are sorted by likes in descending order
    for (let i = 0; i < response.body.length - 1; i++) {
      expect(response.body[i].likes).toBeGreaterThanOrEqual(response.body[i + 1].likes);
    }
  });
});


// Disconnect from the database after all tests have run
afterAll(async () => {
  await mongoose.disconnect();
});
