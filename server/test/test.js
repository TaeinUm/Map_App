// test.js
require('dotenv').config(); // Ensure environment variables are loaded
const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const app = require('../index'); // Adjust the path to where your Express app is exported

describe('GET /', function() {
  it('responds with Welcome to TerraCanvas!', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        expect(res.text).to.equal('Welcome to TerraCanvas!');
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
