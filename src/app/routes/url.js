let Url = require('../models/urlModel');
var Crawler = require("js-crawler");

// GET /crawl route to retrieve all the tasks.
function getUrls(req, res) {
  //Query the DB and if no errors, send all the sites
  let query = Url.find({});
  query.exec((err, urls) => {
    if(err) res.send(err);
    //if no errors, send them back to the client
    res.json(urls);
  });
}

//POST /crawl to save a new site
function postUrl(req, res) {
  var currentUrl = req.body.url;
  var pages = [];
  var crawler = new Crawler().configure({
    shouldCrawl: function(url) {
      if (url.indexOf(currentUrl) < 0) {
        return false;
      } else if (url.indexOf("google") > 0) {
        return false;
      } else if (url.indexOf(".jpg") > 0) {
        return false;
      } else if (url.indexOf(".pdf") > 0) {
        return false;
      } else {
        return true;
      }
    },
    depth: 3,
    maxRequestsPerSecond: 10,
    maxConcurrentRequests: 5
  });

  crawler.crawl({
    url: currentUrl,
    success: function(page) {
      console.log("page: " + page.url);
      pages.push(page.url);
    },
    failure: function(page) {
      console.log(page.status);
    },
    finished: function (crawledUrls) {
      console.log(crawledUrls);
      console.log("finished! " + pages);
    }
  });
  res.status(200);
}

//export all the functions
module.exports = { getUrls, postUrl };
