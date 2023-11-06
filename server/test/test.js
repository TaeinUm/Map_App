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

  // Test for the /api/test-data endpoint
  it('fetches data from the test collection successfully', function(done) {
    request(app)
      .get('/api/top5graphics')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('성공적으로 데이터를 가져왔습니다.');
        expect(res.body.data).to.be.an('array'); // Check if data is an array
        done(err); // Pass the error if there is one to Mocha
      });
  });
});

// Close the mongoose connection after the tests are done
after(function(done) {
  mongoose.disconnect()
    .then(() => done()) // Call done() when the disconnect is successful
    .catch(done); // Pass any errors to done
});