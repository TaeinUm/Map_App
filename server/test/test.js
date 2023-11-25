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
            expect(item).to.include.all.keys('_id', 'interactions', 'postImages', 'postName', 'content', 'postDate', 'postType', 'visibility', 'userId', 'attachedFile');
          });
        }
        done(err);
      });
  });
});

it('creates a new post successfully', function(done) {
  const postData = {
      userId: "65487c7a94678f7bd6d43689".toString(),
      postDate: "2020-01-01",
      content: "Hello World",
      attachedFile: "",
      interactions: 12,
      postType: "map",
      postImages: "https://moonshadowmobile.com/wp-content/uploads/2015/01/us-bubbles-lrg2-logo.png",
      postName: "Hello",
      visibility: 1
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
              expect(res.body).to.include.all.keys('_id', 'interactions', 'postImages', 'postName', 'content', 'postDate', 'postType', 'visibility', 'userId', 'attachedFile');
              done();
          }
      });
});

it('creates a new comment successfully Number2', function(done) {
  const postData = {
      postId: "6559d630cf378d2d911c6387".toString(),
      userId: "65487c7a94678f7bd6d43689".toString(),
      commentDate: "2023-10-11",
      commentContent: 'NEW2',
  };

  request(app)
      .post('/api/community/postcomment')
      .send(postData)
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
          if (err) {
              console.error("Test failed with error:", res.body.message); // 에러 메시지를 콘솔에 출력
              done(err);
          } else {
              expect(res.body).to.be.an('object');
              expect(res.body).to.include.all.keys('_id', 'userId', 'postId', 'commentDate', 'commentContent');
              done();
          }
      });
});

it('should retrieve comments by post ID', function(done) {
  const postId = "6559d630cf378d2d911c6387"; 
  request(app)
      .get(`/api/community/getAllCommentsByPostID/${postId}`)
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

it('should retrieve all comments', function(done) {
  request(app)
      .get('/api/community/getallComments') // Replace with the actual route for getting all comments
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          if (err) {
              console.error("Test failed with error:", err);
              done(err);
          } else {
              expect(res.body).to.be.an('array');
              // Here you can add more specific assertions about the content of the response
              done();
          }
      });
});

it('should retrieve maps by user ID', function(done) {
  const userId = "65487c7a94678f7bd6d43689"; // Ensure this is a valid user ID in your database
  request(app)
    .get(`/api/community/getMapsByUsername/${userId}`)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
        if (err) {
            console.error("Test failed with error:", err); // Log the error object
            console.error("Server response:", res.body); // Log the server response
            done(err);
        } else {
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
