var chai = require('chai'),
	expect = chai.expect,
	chaiHTTP = require('chai-http');
	gulp = require('gulp');

chai.use(chaiHTTP);

var server = require(__dirname + '/../lib/server');
var url = 'http://localhost:3000';

describe('GET or POST request', function() {

  it('should connect without error', function (done) {
    chai.request(url)
      .get('/')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should read hello.txt', function (done) {
    chai.request(url)
      .get('/read/hello.txt')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.text).to.eql('"This is some text"');
        done();
      });
  });

  it('should write hello.json', function (done) {
    chai.request(url)
      .post('/write/hello.json')
      .send('{"msg": "Success sending json"}')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.eql({"msg": "Success sending json"});
        done();
      });
  });
});