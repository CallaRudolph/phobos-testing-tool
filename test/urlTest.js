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
    it('it should not POST a url without url field', (done) => {
      let url = {
        // url: "https://maxobaxo.com",
        result: []
      }
      chai.request(server)
        .post('/crawl')
        .send(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('url');
          res.body.errors.details.should.have.property('kind').eql('required');
        done();
      });
    });
    it('it should POST a url ', (done) => {
      let url = {
        url: "https://maxobaxo.com",
        result: []
      }
      chai.request(server)
        .post('/crawl')
        .send(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('message').eql('url successfully added');
          res.body.task.should.have.property('url');
          res.body.task.should.have.property('result');
        done();
      });
    });
  });

  //test the /GET/:id route
  describe('/GET/:id url', () => {
    it('it should GET a url by the given id', (done) => {
      let url = new Url({ url: "https://maxobaxo.com", result: [] });
      url.save((err, url) => {
        chai.request(server)
        .get('/crawl/' + url.id)
        .send(url)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('url');
          res.body.should.have.property('result');
          res.body.should.have.property('_id').eql(url.id);
        done();
        });
      });
    });
  });

  //test the /DELETE/:id route
  describe('/DELETE/:id url', () => {
    it('it should DELETE a url given the id', (done) => {
      let url = new Url({url: "https://maxobaxo.com", result: []})
      url.save((err, url) => {
        chai.request(server)
        .delete('/crawl/' + url.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('url successfully deleted');
          res.body.result.should.have.property('ok').eql(1);
          res.body.result.should.have.property('n').eql(1);
        done();
        });
      });
    });
  });

});
