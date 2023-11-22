// "scripts": {
//   "test": "mocha"
// },

require('dotenv').config(); // Ensure environment variables are loaded
const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path to where your Express app is exported

describe('API Endpoints', function() {
  // Test for the root endpoint
  it('responds with the correct content type', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/) // Expect HTML content type
      .expect(200)
      .end(function(err, res) {
        // You might want to check for specific HTML content here
        done(err); // Pass the error if there is one to Mocha
      });
  });

  // Test for the /api/top5graphics endpoint
  it('fetches the top 5 graphics successfully', function(done) {
    request(app)
      .get('/api/top5graphics')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        if (res.body.length === 5) {
          res.body.forEach(function(item) {
            expect(item).to.be.an('object');
            // 모든 예상 키들이 있는지 확인
            expect(item).to.include.all.keys('_id', 'likes', 'image', 'title', 'content', 'date', 'types');
          });
        }
        done(err);
      });
  });

});

it('creates a new post successfully', function(done) {
  const postData = {
      userId: "65487c7a94678f7bd6d43689".toString(),
      content: 'Test content',
      likes: 0,
      types: 'Test type',
      image: 'Test image URL',
      title: 'Test title'
  };

  request(app)
      .post('/api/community/post')
      .send(postData)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
          if (err) {
              console.error("Test failed with error:", res.body.message); // 에러 메시지를 콘솔에 출력
              done(err);
          } else {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.all.keys('_id', 'userId', 'content', 'likes', 'types', 'image', 'title');
              done();
          }
      });
});

it('should retrieve maps by user ID', function(done) {
  const userId = "65487c7a94678f7bd6d43689".toString(); // Replace with a valid user ID

  request(app)
      .get(`/api/community/getMapsByUsername/${userId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          if (err) done(err);
          else {
              expect(res.body).to.be.an('array');
              // Additional assertions can be added here
              done();
          }
      });
});

it('should retrieve questions by search text', function(done) {
  const searchText = 'validSearchText'; // Replace with valid search text

  request(app)
      .get(`/api/community/getQuestions/${searchText}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          if (err) done(err);
          else {
              expect(res.body).to.be.an('array');
              // Additional assertions can be added here
              done();
          }
      });
});

it('should retrieve ideas by search text', function(done) {
  const searchText = 'validSearchText'; // Replace with valid search text

  request(app)
      .get(`/api/community/getIdeas/${searchText}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          if (err) done(err);
          else {
              expect(res.body).to.be.an('array');
              // Additional assertions can be added here
              done();
          }
      });
});

it('should retrieve maps by search text', function(done) {
  const searchText = 'validSearchText'; // Replace with valid search text

  request(app)
      .get(`/api/community/getMapsBySearch/${searchText}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          if (err) done(err);
          else {
              expect(res.body).to.be.an('array');
              // Additional assertions can be added here
              done();
          }
      });
});

// Close the mongoose connection after the tests are done
after(function(done) {
  mongoose.disconnect()
    .then(() => done()) // Call done() when the disconnect is successful
    .catch(done); // Pass any errors to done
});
