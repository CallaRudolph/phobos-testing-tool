var Crawler = require("js-crawler");
var http = require('http');
let lighthouse = require('./lighthouse');
let axios = require('axios');
let Result = require('../models/resultModel');

//POST /crawl endpoint to initialize crawler
function postCrawl(req, res) {
  console.log("Crawler running...");
  var currentUrl = req.body.url; // from user input
  var pages = []; // dummy array that will be used to check for duplicate entries

  var crawler = new Crawler().configure({
    shouldCrawl: function(url) {
      if (url.indexOf(currentUrl) < 0) {
        return false; // does not allow crawling outside main site
      } else if (url.indexOf("google") > 0) {
        return false; // does not include google links
      } else if (url.indexOf(".jpg") > 0) {
        return false; // does not include .jpg links
      } else if (url.indexOf(".pdf") > 0) {
        return false; // does not include .pdf links
      } else {
        return true;
      }
    },
    depth: 3, // depth to which links from original site will be crawled. 1 is low.
    maxRequestsPerSecond: 10, // max # of HTTP requests per second that can be made by the crawler
    maxConcurrentRequests: 5 // max # of concurrent requests that should not be exceeded by the crawler
  });

  crawler.crawl({
    url: currentUrl,
    success: function(page) {
      pages.push(page.url); // sends crawled Urls to dummy array
    },
    failure: function(page) {
      console.log(page.status + ": " + page.url); // 404 errors
    },
    finished: function (crawledUrls) {
      // crawledUrls is array of what the crawler returns
      var duplicateCheck = pages.concat(crawledUrls); // combines two separate arrays of all crawled urls
      var set = new Set(duplicateCheck); // removes duplicates from combined array
      noDuplicates = Array.from(set); //creates new array without duplicates

      var error = ["The crawler couldn't find anything from " + currentUrl + ". Check the URL."]; // error message for invalid url inputs - no https, etc.
      if (crawledUrls.length <= 1) {
        res.status(200).json(error); // send error when crawler returns nothing
      } else {
        var blobs = async function(urls) {
          let masterData = [];

          res.status(200).json(noDuplicates)
          res.end("done"); // these are needed to prevent a timeout in the server

          for (let url of urls){
            var blob = await lighthouse.runLighthouse(url).then((jsonBlob) => {
              let paintScore = jsonBlob.audits['first-meaningful-paint']['score'];
              let performanceScore = (jsonBlob.reportCategories[1].score).toFixed();
              let bestPracticeScore = (jsonBlob.reportCategories[3].score).toFixed();
              let accessibilityScore = (jsonBlob.reportCategories[2].score).toFixed();

              var currentResult = {"url":url, "firstPaint":paintScore, "performance":performanceScore, "bestPractices":bestPracticeScore, "accessibility":accessibilityScore}; // shrink to only high level data from jsonBlob due to mongoDB size restriction & '.' key error

              axios.post('http://localhost:3000/results', currentResult)
              .catch(err => {
                console.error(err);
              });
              // need the full url in post request here to prevent connect ECONNREFUSED 127.0.0.1:80
              masterData.push({"blob":currentResult});
            });
          }
          return masterData;
        }

        blobs(noDuplicates).then((resultTotal) => {
          console.log("all crawled urls have been sent through lighthouse!");
        });
      }
    }
  });
}

function getResults(req, res) {
  //Query the DB and if no errors, send all the results
  let query = Result.find({});
  query.exec((err, results) => {
    if(err) res.send(err);
    //if no errors, send them back to the client
    res.json(results);
  });
}

function postResults(req, res) {
  var newResult = new Result(req.body);
  newResult.save((err,result) => {
    if(err) {
      res.send(err);
      console.log(err + " error");
    }
    else {
      res.json({message: "result saved", result});
    }
  });
}

//DELETE /results/:id to delete a result given its id
function deleteResults(req, res) {
  Result.remove({_id : req.params.id}, (err, result) => {
    res.json({ message: "result successfully deleted", result });
  });
}

//export all the functions
module.exports = { postCrawl, postResults, getResults, deleteResults };
