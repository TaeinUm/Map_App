require('dotenv').config(); // Ensure environment variables are loaded
const request = require('supertest');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const app = require('../server'); // Adjust the path to where your Express app is exported

describe('API Endpoints', function() {
    // Test for /api/test-data endpoint
    it('fetches data from the test collection successfully', function(done) {
        request(app)
          .get('/api/test-data')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('message', 'Successfully Loaded');
            expect(Array.isArray(res.body.data)).to.be.true;
            // Add more assertions here if you want to check the structure of the returned documents
            done(err);
          });
      });
});


describe('API Endpoints', function() {
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
            expect(item).to.include.all.keys('_id');
          });
        }
        done(err);
      });
  });
});

describe(' User API Endpoints', function() {
    // it('updates user details successfully', function(done) {
    //     const userId = '65488ef3fec19c23e9a3e06f';
    //     const userData = {
    //         email: 'juyoung.um@stonybrook.edu',
    //         userName: 'Juyoung Um',
    //         password: '1q2w3e4r!'
    //     };

    //     request(app)
    //         .put(`/api/users/${userId}`)
    //         .send(userData)
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .end(function(err, res) {
    //             if (err) done(err);
    //             else {
    //                 expect(res.body).to.be.an('object');
    //                 expect(res.body).to.have.property('message', 'User updated successfully');
    //                 done();
    //             }
    //         });
    // });

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

    it('should retrieve maps by user ID', async function() {
        const userId = '65487c7a94678f7bd6d43689';
        
        const response = await request(app).get(`/api/community/getMapsByUsername/${userId}`);
        
        expect(response.statusCode).to.equal(200);
        expect(Array.isArray(response.body)).to.be.true;
      });
});

describe('Map Interactions API', function() {
    const postId = '6559d630cf378d2d911c6387'; // Replace with a valid postId for testing
  
    it('should like a map successfully', async function() {
      const response = await request(app).put(`/api/community/likeMap/${postId}`);
      
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('message', 'Map liked successfully');
      expect(response.body).to.have.property('updatedPost');
    });
  
    it('should unlike a map successfully', async function() {
      const response = await request(app).put(`/api/community/unlikeMap/${postId}`);
      
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property('message', 'Map unliked successfully');
      expect(response.body).to.have.property('updatedPost');
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

describe('MAP API Test', () => {
    let createdMapId;
  
    it('creates a new map graphic', function(done) {
      const mapData = {
        userId: "656475c6343f5c79b529a476",
        title: "New Map",
        mapType: "Type1",
        version: "1.0",
        privacy: "public",
        mapImage: "",
      };
  
      request(app)
        .post(`/api/mapgraphics/${mapData.userId}/map-graphics`)
        .send(mapData)
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          createdMapId = res.body._id;
          // Additional assertions for the created map graphic
          done();
        });
    });
  
    it('updates an existing map graphic', function(done) {
      const userId = "656475c6343f5c79b529a476";
      const mapId = createdMapId;
      const updateData = { mapType: "UpdatedType", mapLayer: "UpdatedLayer" };
  
      request(app)
        .put(`/api/mapgraphics/${userId}/map-graphics/${mapId}`)
        .send(updateData)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // Additional assertions for the updated map graphic
          done();
        });
    });
  
    it('updates memo content for a map graphic', function(done) {
      const userId = "656475c6343f5c79b529a476";
      const mapId = createdMapId;
      const memoContent = "New memo content";
  
      request(app)
        .put(`/api/mapgraphics/${userId}/${mapId}/memo`)
        .send({ memoContent })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // Additional assertions for the updated memo
          done();
        });
    });
  
    it('retrieves memo content of a map graphic', function(done) {
      const userId = "656475c6343f5c79b529a476";
      const mapId = createdMapId;
  
      request(app)
        .get(`/api/mapgraphics/${userId}/${mapId}/memo`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // Additional assertions for memo content structure
          done();
        });
    });
  
    it('retrieves a specific map graphic', function(done) {
      const userId = "656475c6343f5c79b529a476";
      const mapId = createdMapId;
  
      request(app)
        .get(`/api/mapgraphics/${userId}/map-graphics/${mapId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          // Additional assertions for the specific map graphic
          done();
        });
    });
  
    it('deletes a map graphic', function(done) {
      const userId = "656475c6343f5c79b529a476";
  
      if (!createdMapId) {
        throw new Error("Map ID not set. Map creation test may have failed.");
      }
  
      request(app)
        .delete(`/api/mapgraphics/${userId}/map-graphics/${createdMapId}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.include({
            message: 'Map graphic deleted successfully'
          });
          done();
        });
    });
  });
  


// Close the mongoose connection after the tests are done
after(function(done) {
  mongoose.disconnect()
    .then(() => done()) // Call done() when the disconnect is successful
    .catch(done); // Pass any errors to done
});
