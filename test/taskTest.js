// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
//
// var mongoose = require("mongoose");
// var Task = require('../src/app/models/taskModel');
//
// //Require the dev-dependencies
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var server = require('../src/server/server');
// var should = chai.should();
//
// chai.use(chaiHttp);
//
// //our parent block
// describe('Tasks', () => {
//   beforeEach((done) => { //Before each test we empty the database
//     Task.remove({}, (err) => {
//       done();
//     });
//   });
//
//   //test the /GET route
//   describe('/GET task', () => {
//     it('it should GET all the tasks', (done) => {
//       chai.request(server)
//       .get('/tasks')
//       .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.length.should.be.eql(0);
//         done();
//       });
//     });
//   });
//
//   //test the /POST route
//   describe('/POST task', () => {
//     it('it should not POST a task without details field', (done) => {
//       let task = {
//         title: "wash dishes",
//         time: "never"
//       }
//       chai.request(server)
//         .post('/tasks')
//         .send(task)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('errors');
//           res.body.errors.should.have.property('details');
//           res.body.errors.details.should.have.property('kind').eql('required');
//         done();
//       });
//     });
//     it('it should POST a task ', (done) => {
//       let task = {
//         title: "give dog a bath",
//         time: "next week",
//         details: "scrub a dub dub"
//       }
//       chai.request(server)
//         .post('/tasks')
//         .send(task)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.a.property('message').eql('task successfully added');
//           res.body.task.should.have.property('title');
//           res.body.task.should.have.property('time');
//           res.body.task.should.have.property('details');
//         done();
//       });
//     });
//   });
//
//   //test the /GET/:id route
//   describe('/GET/:id task', () => {
//     it('it should GET a task by the given id', (done) => {
//       let task = new Task({ title: "give dog a bath", time: "next week", details: "scrub a dub dub" });
//       task.save((err, task) => {
//         chai.request(server)
//         .get('/tasks/' + task.id)
//         .send(task)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('title');
//           res.body.should.have.property('time');
//           res.body.should.have.property('details');
//           res.body.should.have.property('_id').eql(task.id);
//         done();
//         });
//       });
//     });
//   });
//
//   //test the /DELETE/:id route
//   describe('/DELETE/:id task', () => {
//     it('it should DELETE a task given the id', (done) => {
//       let task = new Task({title: "eat a sandwich", time: "daily", details: "BLT avocado"})
//       task.save((err, task) => {
//         chai.request(server)
//         .delete('/tasks/' + task.id)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('task successfully deleted');
//           res.body.result.should.have.property('ok').eql(1);
//           res.body.result.should.have.property('n').eql(1);
//         done();
//         });
//       });
//     });
//   });
//
// });
