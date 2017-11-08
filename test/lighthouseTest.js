//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/server');
var should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);

//our parent block
describe('Lighthouse', () => {
  //test the /POST route
  describe('/POST lighthouse', () => {
    // it('it should return a lighthouse object', (done) => {
    //   let url = {
    //     url: "https://airhorner.com",
    //   }
    //   chai.request(server)
    //     .post('/lighthouse')
    //     .send(url)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //     done();
    //   });
    // });
    it('it should contain relevant data through each path', (done) => {
      let url = {
        url: "https://maxobaxo.com",
      }
      chai.request(server)
        .post('/lighthouse')
        .send(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.body.audits['first-meaningful-paint']).to.have.property('displayValue');
          expect(res.body.audits['first-meaningful-paint']).to.have.property('score');
          expect(res.body.audits['speed-index-metric']).to.have.property('score');
          expect(res.body.reportCategories[1]).to.have.property('score');
          expect(res.body.reportCategories[3]).to.have.property('score');
          expect(res.body.reportCategories[2]).to.have.property('score');
        done();
      });
    });
  });


});
