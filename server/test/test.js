require('dotenv').config(); // Ensure environment variables are loaded
const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path to where your Express app is exported

describe('API Endpoints', function() {
  // Test for the root endpoint
  // it('responds with the correct content type', function(done) {
  //   request(app)
  //     .get('/')
  //     .expect('Content-Type', /html/) // Expect HTML content type
  //     .expect(200)
  //     .end(function(err, res) {
  //       // You might want to check for specific HTML content here
  //       done(err); // Pass the error if there is one to Mocha
  //     });
  // });

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
            expect(item).to.include.all.keys('_id', 'interactions', 'postImages', 'postName', 'content', 'postDate', 'postType', 'visibility', 'userId', 'attachedFile');
          });
        }
        done(err);
      });
  });
});

describe(' User API Endpoints', function() {
    it('updates user details successfully', function(done) {
        const userId = '65488ef3fec19c23e9a3e06f';
        const userData = {
            email: 'juyoung.um@stonybrook.edu',
            userName: 'Juyoung Um',
            password: '1q2w3e4r!'
        };

        request(app)
            .put(`/api/users/${userId}`)
            .send(userData)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                else {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('message', 'User updated successfully');
                    done();
                }
            });
    });

    it('retrieves user email successfully', function(done) {
        const userId = '65488ef3fec19c23e9a3e06f';
        const username = 'Juyoung Um';

        request(app)
            .get(`/api/users/${userId}/email`)
            .query({ username })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) done(err);
                else {
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('email');
                    done();
                }
            });
    });
});

describe('Community API Endpoints', function() {
    it('creates and then deletes a new post successfully', function(done) {
        const postData = {
            userId: "65487c7a94678f7bd6d43689",
            content: "DATA",
            attachedFile: "",
            interactions: 12,
            postType: "map",
            postImages: "https://moonshadowmobile.com/wp-content/uploads/2015/01/us-bubbles-lrg2-logo.png",
            postName: "Hello",
            visibility: 1
        };

        // First, create the post
        request(app)
            .post('/api/community/post')
            .send(postData)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(postErr, postRes) {
                if (postErr) {
                    console.error("Post creation failed with error:", postRes.body.message);
                    done(postErr);
                } else {
                    expect(postRes.body).to.be.an('object');
                    expect(postRes.body).to.include.all.keys('_id', 'interactions', 'postImages', 'postName', 'content', 'postType', 'visibility', 'userId', 'attachedFile');

                    const postId = postRes.body._id;

                    // Then, delete the post
                    request(app)
                        .delete(`/api/community/deletePost/${postId}`)
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(deleteErr, deleteRes) {
                            if (deleteErr) {
                                console.error("Post deletion failed with error:", deleteRes.body.message);
                                done(deleteErr);
                            } else {
                                expect(deleteRes.body).to.be.an('object');
                                expect(deleteRes.body).to.have.property('message', 'Post deleted successfully');
                                done();
                            }
                        });
                }
            });
    });


    // it('creates a new comment successfully', function(done) {
    //   const postData = {
    //       postId: "6559d630cf378d2d911c6387".toString(),
    //       userId: "65487c7a94678f7bd6d43689".toString(),
    //       commentDate: "2023-10-11",
    //       commentContent: 'NEW2',
    //   };

    //   request(app)
    //       .post('/api/community/postcomment')
    //       .send(postData)
    //       .expect('Content-Type', /json/)
    //       .expect(201)
    //       .end(function(err, res) {
    //           if (err) {
    //               console.error("Test failed with error:", res.body.message);
    //               done(err);
    //           } else {
    //               expect(res.body).to.be.an('object');
    //               expect(res.body).to.include.all.keys('_id', 'userId', 'postId', 'commentContent');
    //               done();
    //           }
    //       });
    // });

    it('creates and then deletes a new comment successfully', function(done) {
        const postData = {
            postId: "6559d630cf378d2d911c6387",
            userId: "65487c7a94678f7bd6d43689",
            commentDate: "2023-10-11",
            commentContent: 'NEW2',
        };

        // First, create the comment
        request(app)
            .post('/api/community/postcomment')
            .send(postData)
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(createErr, createRes) {
                if (createErr) {
                    console.error("Comment creation failed with error:", createRes.body.message);
                    done(createErr);
                } else {
                    expect(createRes.body).to.be.an('object');
                    expect(createRes.body).to.include.all.keys('_id', 'userId', 'postId', 'commentContent');

                    const commentId = createRes.body._id;

                    // Then, delete the comment
                    request(app)
                        .delete(`/api/community/deleteComment/${commentId}`) // Replace with your actual delete endpoint
                        .expect(200)
                        .end(function(deleteErr, deleteRes) {
                            if (deleteErr) {
                                console.error("Comment deletion failed with error:", deleteRes.body.message);
                                done(deleteErr);
                            } else {
                                expect(deleteRes.body).to.have.property('message', 'Comment deleted successfully');
                                done();
                            }
                        });
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
});

// Close the mongoose connection after the tests are done
after(function(done) {
  mongoose.disconnect()
    .then(() => done()) // Call done() when the disconnect is successful
    .catch(done); // Pass any errors to done
});
