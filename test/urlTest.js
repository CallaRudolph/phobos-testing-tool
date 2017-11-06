//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Url = require('../src/app/models/urlModel');

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/server');
var should = chai.should();

chai.use(chaiHttp);

//our parent block
describe('Urls', () => {
  beforeEach((done) => { //Before each test we empty the database
    Url.remove({}, (err) => {
      done();
    });
  });

  //test the /GET route
  describe('/GET url', () => {
    it('it should GET all the urls', (done) => {
      chai.request(server)
      .get('/crawl')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  //test the /POST route
  describe('/POST url', () => {
    it('it should POST a url ', (done) => {
      let url = {
        url: "https://maxobaxo.com",
      }
      chai.request(server)
        .post('/crawl')
        .send(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

        done();
      });
    });
  });

});
