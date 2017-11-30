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
// describe('Crawl/Lighthouse', () => {
//   //test the /POST route
//   describe('run lighthouse on each url', () => {
//     it('it should run lighthouse on each url', (done) => {
//       let url = {
//         url: "https://percussionaire.com",
//       }
//       chai.request(server)
//         .post('/crawl')
//         .send(url)
//         .then(function (res) {
//           // test that the crawl response triggers lighthouse post request
//
//         done();
//       });
//     });
//   });
// });
