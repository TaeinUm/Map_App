// Json Modification
// "scripts": {
//   "test": "mocha"
// },

// test.js
// require('dotenv').config(); // Ensure environment variables are loaded
// const request = require('supertest');
// const expect = require('chai').expect;
// const mongoose = require('mongoose');
// const app = require('../index'); // Adjust the path to where your Express app is exported

// describe('GET /', function() {
//   it('responds with Welcome to TerraCanvas!', function(done) {
//     request(app)
//       .get('/')
//       .end(function(err, res) {
//         expect(res.text).to.equal('Welcome to TerraCanvas!');
//         done(err); // Pass the error if there is one to Mocha
//       });
//   });
// });

// // Close the mongoose connection after the tests are done
// after(function(done) {
//   mongoose.disconnect()
//     .then(() => done()) // Call done() when the disconnect is successful
//     .catch(done); // Pass any errors to done
// });

require('dotenv').config(); // Ensure environment variables are loaded
const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const app = require('../index'); // Adjust the path to where your Express app is exported

describe('API Endpoints', function() {
  // Test for the root endpoint
  it('responds with Welcome to TerraCanvas!', function(done) {
    request(app)
      .get('/')
      .end(function(err, res) {
        expect(res.text).to.equal('Welcome to TerraCanvas!');
        done(err); // Pass the error if there is one to Mocha
      });
  });

  // Test for the /api/test-data endpoint
  it('fetches data from the test collection successfully', function(done) {
    request(app)
      .get('/api/test-data')
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array'); // Assuming the data is an array
        // Add more assertions here if you want to check the structure of the returned documents
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
