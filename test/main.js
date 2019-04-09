import http from 'http';
import assert from 'assert';

import server from '../src/main';

describe('Test Node Server', () => {
  it('Should return 200', done => {
      http.get('http:/localhost:3000', res => {
          assert.equal(200, res.statusCode);
          server.close();
          done();
      })
  })
})