var Crawler = require("js-crawler");
var http = require('http');
let lighthouse = require('./lighthouse');
let axios = require('axios');
let Result = require('../models/resultModel');
let LHCrawl = require('../models/LHCrawlModel');
let uuid = require('uuid-v4');

//POST /crawl endpoint to initialize crawler
function postCrawl(req, res) {
  console.log("Crawler running...");
  var currentUrl = req.body.url; // from user input
  var pages = []; // dummy array that will be used to check for duplicate entries

  var crawler = new Crawler().configure({
    shouldCrawl: function(url) {
      if (url.indexOf(currentUrl) < 0) {
        return false; // does not allow crawling outside main site
      } else if (url.indexOf("https://google.com") > 0) {
        return false; // does not include google links
      } else if (url.indexOf(".jpg") > 0) {
        return false; // does not include .jpg links
      } else if (url.indexOf(".pdf") > 0) {
        return false; // does not include .pdf links
      } else if (url.indexOf("mailto:") >= 0) {
        return false; // does not include mailto links
      } else if (url.indexOf("https://twitter.com") >= 0) {
        return false; // does not include twitter links
      } else if (url.indexOf("https://facebook.com") >= 0) {
        return false; // does not include facebook links
      } else if (url.indexOf("https://accounts.google.com") >= 0) {
        return false; // does not include facebook links
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
          let masterData = []; // for LHsummary
          let crawlLHData = [];

          res.status(200).json(noDuplicates)
          res.end("done"); // these are needed to prevent a timeout in the server

          for (let url of urls){
            var blob = await lighthouse.runLighthouse(url).then((jsonBlob) => {
              /////////////////summary////////////////////////
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
              //////////////////end summary ///////////////////////

              let perfOpp = jsonBlob.reportCategories[1].audits;

              // offscreen images
              let offscreenHelpDisplay = [];
              let offscreenDisplay = [];
              for (var i = 0; i < perfOpp.length; i++) {
                if(perfOpp[i].id === "offscreen-images" && perfOpp[i].score < 100) {
                  var offscreenHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                  offscreenHelpDisplay.push(offscreenHelp);
                  var offscreenItems = perfOpp[i].result.details.items;
                  if (offscreenItems.length > 0) {
                    for (var j = 0; j < offscreenItems.length; j++) {
                      var item = offscreenItems[j][1].text;
                      var size = offscreenItems[j][2].text;
                      offscreenDisplay.push(" " + item + " size: " + size);
                    }
                  }
                }
              }

              // render-blocking stylesheets
              let renderSheetsHelpDisplay = [];
              let renderSheetsDisplay = [];
              for (var i = 0; i < perfOpp.length; i++) {
                if(perfOpp[i].id === "link-blocking-first-paint" && perfOpp[i].score < 100) {
                  var renderSheetsHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                  renderSheetsHelpDisplay.push(renderSheetsHelp);
                  var renderSheetsItems = perfOpp[i].result.details.items;
                  if (renderSheetsItems.length > 0) {
                    for (var j = 0; j < renderSheetsItems.length; j++) {
                      var item = renderSheetsItems[j][0].text;
                      var size = renderSheetsItems[j][1].text;
                      renderSheetsDisplay.push(" " + item + " size: " + size);
                    }
                  }
                }
              }

              // render-blocking scripts
              let renderScriptsHelpDisplay = [];
              let renderScriptsDisplay = [];
              for (var i = 0; i < perfOpp.length; i++) {
                if(perfOpp[i].id === "script-blocking-first-paint" && perfOpp[i].score < 100) {
                  var renderScriptsHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                  renderScriptsHelpDisplay.push(renderScriptsHelp);
                  var renderScriptsItems = perfOpp[i].result.details.items;
                  if (renderScriptsItems.length > 0) {
                    for (var j = 0; j < renderScriptsItems.length; j++) {
                      var item = renderScriptsItems[j][0].text;
                      var size = renderScriptsItems[j][1].text;
                      renderScriptsDisplay.push(" " + item + " size: " + size);
                    }
                  }
                }
              }

              // properly size images
              let imageSizeHelpDisplay = [];
              let imageSizeDisplay = [];
              for (var i = 0; i < perfOpp.length; i++) {
                if(perfOpp[i].id === "uses-responsive-images" && perfOpp[i].score < 100) {
                  var imageSizeHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                  imageSizeHelpDisplay.push(imageSizeHelp);
                  var imageSizeItems = perfOpp[i].result.details.items;
                  if (imageSizeItems.length > 0) {
                    for (var j = 0; j < imageSizeItems.length; j++) {
                      var item = imageSizeItems[j][1].text;
                      var size = imageSizeItems[j][2].text;
                      imageSizeDisplay.push(" " + item + " size: " + size);
                    }
                  }
                }
              }

              // optimize images
              let optimizeImageHelpDisplay = [];
              let optimizeImageDisplay = [];
              for (var i = 0; i < perfOpp.length; i++) {
                if(perfOpp[i].id === "uses-optimized-images" && perfOpp[i].score < 100) {
                  var optimizeImageHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                  optimizeImageHelpDisplay.push(optimizeImageHelp);
                  var optimizeImageItems = perfOpp[i].result.details.items;
                  if (optimizeImageItems.length > 0) {
                    for (var j = 0; j < optimizeImageItems.length; j++) {
                      var item = optimizeImageItems[j][1].text;
                      var size = optimizeImageItems[j][2].text;
                      optimizeImageDisplay.push(" " + item + " size: " + size);
                    }
                  }
                }
              }

              // // accessibility opportunities
              // let accessOpp = jsonBlob.reportCategories[2].audits;
              //
              // let imageAltDisplay = [];
              // let imageAltHelpDisplay = [];
              //
              // for (var i = 0; i < accessOpp.length; i++) {
              //   // image alt
              //   if (accessOpp[i].id === "image-alt" && accessOpp[i].score < 100) {
              //     var imageAltHelp = accessOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
              //     imageAltHelpDisplay.push(imageAltHelp);
              //     var imageAltItems = accessOpp[i].result.details.items;
              //     if (imageAltItems.length > 0) {
              //       for (var j = 0; j < imageAltItems.length; j++) {
              //         var item = imageAltItems[j].snippet;
              //         imageAltDisplay.push(" " + item);
              //       }
              //     }
              //   }
              // }



              var crawlLHResult = {"url":url,
                "id":uuid(),
                "offscreenHelp":offscreenHelpDisplay, "offscreenImages":offscreenDisplay, "renderSheetsHelp":renderSheetsHelpDisplay, "renderSheets":renderSheetsDisplay, "renderScriptsHelp":renderScriptsHelpDisplay, "renderScripts":renderScriptsDisplay, "imageSizeHelp":imageSizeHelpDisplay, "imageSize":imageSizeDisplay, "optimizeImageHelp":optimizeImageHelpDisplay, "optimizeImage":optimizeImageDisplay};

              axios.post('http://localhost:3000/crawlLH', crawlLHResult)
              .catch(err => {
                console.error(err);
              });
              crawlLHData.push({"blob":crawlLHResult});
            });
          }
          // return masterData; USE FOR SUMMARY!
          return crawlLHData;
        }

        blobs(noDuplicates).then((resultTotal) => {
          console.log("all crawled urls have been sent through lighthouse!");
        });
      }
    }
  });
}

//////////////////SUMMARY////////////////////////
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
//////////////END SUMMARY///////////////////////

function getLHCrawl(req, res) {
  //Query the DB and if no errors, send all the results
  let query = LHCrawl.find({});
  query.exec((err, LHCrawl) => {
    if(err) res.send(err);
    //if no errors, send them back to the client
    res.json(LHCrawl);
  });
}

function postLHCrawl(req, res) {
  var newLHCrawl = new LHCrawl(req.body);
  newLHCrawl.save((err,LHCrawl) => {
    if(err) {
      res.send(err);
      console.log(err + " error");
    }
    else {
      res.json({message: "LH Crawl saved", LHCrawl});
    }
  });
}

//DELETE /LHCrawl/:id to delete a result given its id
function deleteLHCrawl(req, res) {
  LHCrawl.remove({_id : req.params.id}, (err, LHCrawl) => {
    res.json({ message: "LH Crawl successfully deleted", LHCrawl });
  });
}

//export all the functions
module.exports = { postCrawl, postResults, getResults, deleteResults, getLHCrawl, postLHCrawl, deleteLHCrawl };
