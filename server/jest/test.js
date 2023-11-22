
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


describe('Community API Endpoints', () => {
  test('creates a new post successfully', async () => {
      const postData = {
          userId: "65487c7a94678f7bd6d43689",
          content: 'Test content',
          likes: 0,
          types: 'Test type',
          image: 'Test image URL',
          title: 'Test title'
      };

      const response = await request(app)
          .post('/api/community/post')
          .send(postData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({
          userId: postData.userId,
          content: postData.content,
          // ... other fields
      });
  });

  test('creates a new comment successfully', async () => {
      const commentData = {
          postId: "6559d630cf378d2d911c6387",
          userId: "65487c7a94678f7bd6d43689",
          date: "2023-10-11",
          content: 'Test content',
      };

      const response = await request(app)
          .post('/api/community/postcomment')
          .send(commentData);

      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject({
          postId: commentData.postId,
          userId: commentData.userId,
          // ... other fields
      });
  });

  test('should retrieve comments by post ID', async () => {
      const postId = "6559d630cf378d2d911c6387";
      const response = await request(app)
          .get(`/api/community/getAllCommentsByPostID/${postId}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should retrieve all comments', async () => {
      const response = await request(app)
          .get('/api/community/getallComments');

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should retrieve maps by user ID', async () => {
      const userId = "65487c7a94678f7bd6d43689";
      const response = await request(app)
          .get(`/api/community/getMapsByUsername/${userId}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should retrieve questions by search text', async () => {
      const searchText = 'validSearchText';
      const response = await request(app)
          .get(`/api/community/getQuestions/${searchText}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should retrieve ideas by search text', async () => {
      const searchText = 'validSearchText';
      const response = await request(app)
          .get(`/api/community/getIdeas/${searchText}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should retrieve maps by search text', async () => {
      const searchText = 'validSearchText';
      const response = await request(app)
          .get(`/api/community/getMapsBySearch/${searchText}`);

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
  });
});



// Disconnect from the database after all tests have run
// Replace 'after' with 'afterAll' if you are using Jest
afterAll(function(done) {
  mongoose.disconnect()
    .then(() => done()) // Call done() when the disconnect is successful
    .catch(done); // Pass any errors to done
});
