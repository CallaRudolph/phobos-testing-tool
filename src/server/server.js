var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

let task = require('../app/routes/task');
let crawl = require('../app/routes/crawl');
let lighthouse = require('../app/routes/lighthouse');

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
// increase limit from default 1mb

//parse application/json and look for raw text
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000})); // increase limit for large lighthouse object to save to mongo
app.use(bodyParser.json({ type: 'application/json'}));

app.use(express.static(__dirname + './../../'));

mongoose.Promise = global.Promise;

if(process.env.MONGODB_URI) {
  mongoose.createConnection(process.env.MONGODB_URI);
} else {
  var mongoDB = 'mongodb://127.0.0.1/my_database';
  mongoose.createConnection(mongoDB);

  /* Drop the DB if needed::: */
  // mongoose.connect(mongoDB, { useMongoClient: true, promiseLibrary: global.Promise }, function(){
  //   // useMongoClient & promiseLibrary cancel out server error message: (node:2029) DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0, use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`. See http://mongoosejs.com/docs/connections.html#use-mongo-client
  //   mongoose.connection.db.dropDatabase();
  // });
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("app now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/", (req, res) => res.json({message: "Welcome to the task list"}));
app.route("/tasks")
  .get(task.getTasks)
  .post(task.postTask);
app.route("/tasks/:id")
  .get(task.getTask)
  .delete(task.deleteTask)
  .put(task.updateTask);
app.route("/crawl")
  .post(crawl.postCrawl);
app.route("/lighthouse")
  .post(lighthouse.postLighthouse);
app.route("/results")
  .get(crawl.getResults)
  .post(crawl.postResults);
app.route("/results/:id")
  .get(crawl.getResults)
  .delete(crawl.deleteResults);
app.route("/crawlLH")
  .get(crawl.getLHCrawl)
  .post(crawl.postLHCrawl);
app.route("/crawlLH/:id")
  .get(crawl.getLHCrawl)
  .delete(crawl.deleteLHCrawl);
app.route("/basicCrawl")
  .post(crawl.basicCrawl);

module.exports = app; //for testing
