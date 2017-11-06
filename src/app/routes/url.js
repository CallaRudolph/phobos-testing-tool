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
  console.log("Crawler running.....")
  var currentUrl = req.body.url;
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
    depth: 3,
    maxRequestsPerSecond: 10,
    maxConcurrentRequests: 5
  });

  crawler.crawl({
    url: currentUrl,
    success: function(page) {
      console.log("page: " + page.url);
    },
    failure: function(page) {
      console.log(page.status);
    },
    finished: function (crawledUrls) {
      console.log(crawledUrls);
      console.log(crawledUrls.length + " pages crawled");
      res.status(200).json(crawledUrls);
    }
  });
  // var newUrl = new Url(req.body.url);
  // newUrl.save((err,url) => {
  //   if(err) {
  //     res.send(err)
  //   }
  //   else {
  //     res.json({message: "url successfully added", url})
  //   }
  // });
}

//export all the functions
module.exports = { getUrls, postUrl };
