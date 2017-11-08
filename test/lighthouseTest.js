//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/server');
var should = chai.should();

chai.use(chaiHttp);

//our parent block
describe('Lighthouse', () => {
  //test the /POST route
  describe('/POST lighthouse', () => {
    it('it should return a lighthouse object', (done) => {
      let url = {
        url: "https://airhorner.com",
      }
      chai.request(server)
        .post('/lighthouse')
        .send(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
        done();
      });
    });
  });

});
