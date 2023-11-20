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
      types: '000',
      image: '',
      title: '00000'
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

it('should increment the likes of a post', function(done) {
  const postId = "6559d630cf378d2d911c6387"; // Replace with a valid post ID

  request(app)
    .post(`/api/community/likeMap/${postId}`) // Make sure this matches your actual route
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) {
        done(err);
      } else {
        expect(res.body).to.be.an('object');
        expect(res.body.updatedPost.likes).to.be.above(0); // Assuming the post initially has 0 likes
        done();
      }
    });
});

it('should decrement the likes of a post', function(done) {
  const postId = "6559d630cf378d2d911c6387"; // Replace with a valid post ID

  request(app)
    .post(`/api/community/unlikeMap/${postId}`) // Make sure this matches your actual route
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) {
        done(err);
      } else {
        expect(res.body).to.be.an('object');
        expect(res.body.updatedPost.likes).to.be.least(0); // Assuming the post initially has some likes
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
