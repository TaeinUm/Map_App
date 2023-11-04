// server/test/index.test.js
const request = require('supertest');
const app = require('../index'); // 상대 경로를 사용하여 index.js 파일을 가져옵니다.

describe('GET /', function() {
  it('responds with Welcome to TerraCanvas!', function(done) {
    request(app)
      .get('/')
      .expect('Welcome to TerraCanvas!', done);
  });
});
