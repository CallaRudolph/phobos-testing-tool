// //During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
//
// var mongoose = require("mongoose");
//
// //Require the dev-dependencies
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// var server = require('../src/server/server');
// var should = chai.should();
// var expect = require('chai').expect;
//
// chai.use(chaiHttp);
//
// //our parent block
// describe('Crawler', () => {
//   //test the /POST route
//   describe('/POST crawl', () => {
//     it('it should return error message with faulty url input', (done) => {
//       let url = {
//         url: "http://maxobaxo.com",
//       }
//       chai.request(server)
//         .post('/crawl')
//         .send(url)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.should.include("The crawler couldn't find anything from http://maxobaxo.com. Check the URL.");
//         done();
//       });
//     });
//     it('it should not return duplicate urls', (done) => {
//       let url = {
//         url: "https://argylewinery.com",
//       }
//       chai.request(server)
//         .post('/crawl')
//         .send(url)
//         .end((err, res) => {
//           res.should.have.status(200);
//           expect(['https://argylewinery.com/shop/wines/']).to.have.lengthOf(1);
//         done();
//       });
//     });
//     it('it should return a crawl array', (done) => {
//       let url = {
//         url: "https://maxobaxo.com",
//       }
//       chai.request(server)
//         .post('/crawl')
//         .send(url)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('array');
//           res.body.length.should.be.eql(35);
//           res.body.should.not.include('google');
//           res.body.should.not.include('.jpg');
//           res.body.should.not.include('.pdf');
//         done();
//       });
//     });
//   });
//
// });
