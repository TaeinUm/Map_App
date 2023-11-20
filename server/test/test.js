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

// Close the mongoose connection after the tests are done
after(function(done) {
  mongoose.disconnect()
    .then(() => done()) // Call done() when the disconnect is successful
    .catch(done); // Pass any errors to done
});
