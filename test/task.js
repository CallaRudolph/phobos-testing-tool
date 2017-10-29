//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Task = require('../src/app/models/task');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/server/server');
let should = chai.should();

chai.use(chaiHttp);

//our parent block
describe('Tasks', () => {
  beforeEach((done) => { //Before each test we empty the database
    Task.remove({}, (err) => {
      done();
    });
  });

  //test the /GET route
  describe('/GET task', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(server)
      .get('/task')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  //test the /POST route
  describe('/POST task', () => {
    it('it should not POST a task without details field', (done) => {
      let task = {
        title: "wash dishes",
        time: "never"
      }
      chai.request(server)
        .post('/task')
        .send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('details');
          res.body.errors.details.should.have.property('kind').eql('required');
        done();
      });
    });
  });

});
