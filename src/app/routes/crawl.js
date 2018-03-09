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
              // let paintScore = jsonBlob.audits['first-meaningful-paint']['score'];
              // let performanceScore = (jsonBlob.reportCategories[0].score).toFixed();
              // let bestPracticeScore = (jsonBlob.reportCategories[3].score).toFixed();
              // let accessibilityScore = (jsonBlob.reportCategories[2].score).toFixed();
              //
              // var currentResult = {"url":url, "firstPaint":paintScore, "performance":performanceScore, "bestPractices":bestPracticeScore, "accessibility":accessibilityScore}; // shrink to only high level data from jsonBlob due to mongoDB size restriction & '.' key error
              //
              // axios.post('http://localhost:3000/results', currentResult)
              // .catch(err => {
              //   console.error(err);
              // });
              // // need the full url in post request here to prevent connect ECONNREFUSED 127.0.0.1:80
              // masterData.push({"blob":currentResult});
              //////////////////end summary ///////////////////////

              ///////// PERFORMANCE /////////////

              let perfOpp = jsonBlob.reportCategories[0].audits;

              function parseLHOpportunity (name, startIndex) {
                let data = {
                  helpdisplay: [],
                  items: [],
                };

                for (var i = 0; i < perfOpp.length; i++) {
                  if(perfOpp[i].id === name && perfOpp[i].score < 100) {
                    var help = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                    data.helpdisplay.push(help);
                    var items = perfOpp[i].result.details.items;
                    if (items.length > 0) {
                      for (var j = 0; j < items.length; j++) {
                        var item = items[j][startIndex].text;
                        var size = items[j][startIndex+1].text;
                        data.items.push(" " + item + " size: " + size)
                      }
                    }
                  }
                }

                return data;
              }

              let perfArray = [["offscreen-images", 1], ["link-blocking-first-paint", 0], ["script-blocking-first-paint", 0], ["uses-responsive-images", 1], ["uses-optimized-images", 1]];

              let perfModelArray = [];
              perfArray.map(individual => {
                let individualModel = parseLHOpportunity(individual[0], individual[1]);
                perfModelArray.push(individualModel);
              });

              ////////////// END PERFORMANCE /////////////

              ////////////////// ACCESSIBILITY /////////////

              let accOpp = jsonBlob.reportCategories[2].audits;

              function parseLHAccessibility (name) {
                let data = {
                  helpdisplay: [],
                  items: []
                };

                for (var i = 0; i < accOpp.length; i++) {
                  if (accOpp[i].id === name && accOpp[i].score < 100 && accOpp[i].group !== "manual-a11y-checks") {
                    var help = accOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
                    data.helpdisplay.push(help);
                    var items = accOpp[i].result.details.items;
                    if (items.length > 0) {
                      for (var j = 0; j < items.length; j++) {
                        var item = items[j].snippet;
                        data.items.push(item)
                      }
                    }
                  }
                }

                return data;
              }

              let accArray = [["accesskeys"], ["aria-allowed-attr"], ["aria-required-attr"], ["aria-required-children"], ["aria-required-parent"], ["aria-roles"], ["aria-valid-attr-value"], ["aria-valid-attr"], ["audio-caption"], ["button-name"], ["bypass"], ["color-contrast"], ["definition-list"], ["dlitem"], ["document-title"], ["duplicate-id"], ["frame-title"], ["html-has-lang"], ["html-lang-valid"], ["image-alt"], ["input-image-alt"], ["label"], ["layout-table"], ["link-name"], ["list"], ["list-item"], ["meta-refresh"], ["meta-viewport"], ["object-alt"], ["tabindex"], ["td-headers-attr"], ["ht-has-data-cells"], ["valid-lang"], ["video-caption"], ["video-description"]];

              let accModelArray = [];
              accArray.map(individual => {
                let individualModel = parseLHAccessibility(individual[0]);
                accModelArray.push(individualModel);
              });


              //////////////// END ACCESSIBILITY /////////////

              var crawlLHResult = {"mainUrl":currentUrl,
                "url":url,
                "id":uuid(),
                // "firstPaint":paintScore,
                // "performance":performanceScore,
                // "bestPractices":bestPracticeScore,
                // "accessibility":accessibilityScore,
                "offscreen":perfModelArray[0],
                "renderSheets":perfModelArray[1],
                "renderScripts":perfModelArray[2],
                "imageSize":perfModelArray[3],
                "optimizeImage":perfModelArray[4],
                "accessKeys":accModelArray[0],
                "ariaAllowedAttr":accModelArray[1],
                "ariaRequiredAttr":accModelArray[2],
                "ariaRequiredChildren":accModelArray[3],
                "ariaRequiredParent":accModelArray[4],
                "ariaRoles":accModelArray[5],
                "ariaValidAttrValue":accModelArray[6],
                "ariaValidAttr":accModelArray[7],
                "audioCaption":accModelArray[8],
                "buttonName":accModelArray[9],
                "bypass":accModelArray[10],
                "colorContrast":accModelArray[11],
                "definitionList":accModelArray[12],
                "dlItem":accModelArray[13],
                "documentTitle":accModelArray[14],
                "duplicateID":accModelArray[15],
                "frameTitle":accModelArray[16],
                "htmlHasLang":accModelArray[17],
                "htmlLangValid":accModelArray[18],
                "imageAlt":accModelArray[19],
                "inputImageAlt":accModelArray[20],
                "label":accModelArray[21],
                "layoutTable":accModelArray[22],
                "linkName":accModelArray[23],
                "list":accModelArray[24],
                "listItem":accModelArray[25],
                "metaRefresh":accModelArray[26],
                "metaViewport":accModelArray[27],
                "objectAlt":accModelArray[28],
                "tabIndex":accModelArray[29],
                "tdHeadersAttr":accModelArray[30],
                "thHasDataCells":accModelArray[31],
                "validLang":accModelArray[32],
                "videoCaption":accModelArray[33],
                "videoDescription":accModelArray[34]};

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

function basicCrawl(req, res) {
  console.log("Basic crawler running...");
  var currentUrl = req.body.url; // from user input
  var pages = []; // dummy array that will be used to check for duplicate entries

  var crawler = new Crawler().configure({
    shouldCrawl: function(url) {
      if (url.indexOf(currentUrl) < 0) {
        return false; // does not allow crawling outside main site
      }

      let excludedUrls = ['https://google.com', '.jpg', '.pdf', 'mailto:', 'https://twitter.com', 'https://facebook.com', 'https://accounts.google.com'];

            return !excludedUrls.includes(url);
      // else if (url.indexOf("https://google.com") > 0) {
      //   return false; // does not include google links
      // } else if (url.indexOf(".jpg") > 0) {
      //   return false; // does not include .jpg links
      // } else if (url.indexOf(".pdf") > 0) {
      //   return false; // does not include .pdf links
      // } else if (url.indexOf("mailto:") >= 0) {
      //   return false; // does not include mailto links
      // } else if (url.indexOf("https://twitter.com") >= 0) {
      //   return false; // does not include twitter links
      // } else if (url.indexOf("https://facebook.com") >= 0) {
      //   return false; // does not include facebook links
      // } else if (url.indexOf("https://accounts.google.com") >= 0) {
      //   return false; // does not include facebook links
      // } else {
      //   return true;
      // }
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
        res.status(200).json(error);
      } else {
        res.status(200).json(noDuplicates);
      }
    }
  });
}

//export all the functions
module.exports = { postCrawl, postResults, getResults, deleteResults, getLHCrawl, postLHCrawl, deleteLHCrawl, basicCrawl };
