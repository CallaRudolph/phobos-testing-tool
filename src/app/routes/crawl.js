var Crawler = require("js-crawler");
var http = require('http');

//make a async function to call with a url to go fetch lighthouse data
// this is where you will put the post request

async function retrieveJsonBlobs ($urls){
  for (let $aUrl of $urls){
    const blob = await getJson($aUrl);
    console.log(blob);
  }
}

async function getJson($aUrl){
  const postData = JSON.stringify({
    'url': $aUrl
  });

  //The url we want `http://localhost:3000/lighthouse`
  var options = {
    host: 'localhost',
    path: '/lighthouse',
    //since we are listening on a custom port, we need to specify it by hand
    port: '3000',
    //This is what changes the request to a POST request
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(postData);
  req.end();
}









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
        retrieveJsonBlobs(noDuplicates)
        .then(res.status(200).json(noDuplicates) // send full list from crawler with no duplicates
        );




      }
    }
  });
}

//export all the functions
module.exports = { postCrawl };
