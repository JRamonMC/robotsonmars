const request = require('supertest')
const app = require('./../server')
/**
 * Test all robotrwers case
 */
describe("GET /robots", () => {
    it('respond with json containing a list of all robots', done => {
        request(app)
            .get('/')
            .set('Accept', 'text/html')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done)
    });
});
