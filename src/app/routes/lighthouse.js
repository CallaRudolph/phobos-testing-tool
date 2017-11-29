const lighthouse = require('lighthouse');
self.setImmediate = function(callback, ...argsForCallback) {
  Promise.resolve().then(() => callback(...argsForCallback));
  return 0;
}; // prevents '_destroySSL' error message during testing between lighthouse & crawler
const chromeLauncher = require('chrome-launcher');

chromeOptions = {
        chromeFlags: ["--disable-gpu", "--headless", "--enable-logging", "--no-sandbox"]
} // need these to prevent (node:2808) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: connect ECONNREFUSED 127.0.0.1:43215 in Travis

function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
  return chromeLauncher.launch(chromeOptions).then(chrome => {
    flags.port = chrome.port;
    return lighthouse(url, flags, config).then(results =>
      chrome.kill().then(() => results));
  });
}

//POST /lighthouse to save a new site
function postLighthouse(req, res) {
  console.log("Lighthouse running...");
  var currentUrl = req.body.url; // from user input
  const flags = {output: 'json'};

  // Usage:
  launchChromeAndRunLighthouse(currentUrl, flags).then(results => {
    // console.log(results);
    res.status(200).json(results);
  });
}

// runs lighthouse on every url from the crawler
function runLighthouse(url){
  console.log("Lighthouse running for crawler");
  var currentUrl = url; // from user input
  const flags = {output: 'json'};

  return new Promise((resolve, reject) => {
    launchChromeAndRunLighthouse(currentUrl, flags).then(results => {
      resolve(results);
    });
  });
}

//export all the functions
module.exports = { postLighthouse, runLighthouse };
