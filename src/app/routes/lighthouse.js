// const lighthouse = require('lighthouse');
// const chromeLauncher = require('chrome-launcher');
//
// function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
//   return chromeLauncher.launch().then(chrome => {
//     flags.port = chrome.port;
//     return lighthouse(url, flags, config).then(results =>
//       chrome.kill().then(() => results));
//   });
// }
//
//
// //POST /lighthouse to save a new site
// function postUrl(req, res) {
//   console.log("Lighthouse running...");
//   var currentUrl = req.body.url; // from user input
//   const flags = {output: 'json'};
//
//   // Usage:
//   launchChromeAndRunLighthouse(currentUrl, flags).then(results => {
//     console.log(results);
//     res.status(200).json(results);
//   });
//
// }
//
// //export all the functions
// module.exports = { postUrl };
