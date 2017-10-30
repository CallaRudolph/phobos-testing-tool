var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
const path = require('path');
var ObjectID = mongodb.ObjectID;

let task = require('../app/routes/task');

var TASK_COLLECTION = 'tasks';

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + './../../'));

// var mongoDB = 'mongodb://127.0.0.1/my_database';
// Mongoose.connect(mongoDB);
//
// var db = Mongoose.connection;

var db ;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
//
  db = database;
  console.log("Database connection ready");
//
  // var server = app.listen(process.env.PORT || 8080, function () {
  //   var port = server.address().port;
  //   console.log("App now running on port", port);
  // });
});

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//parse application/json and look for raw text
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));

var server = app.listen(process.env.PORT || 3000, function (){
  var port = server.address().port;
  console.log("app now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get("/", (req, res) => res.json({message: "Welcome to the task list"}));
app.route("/task")
  .get(task.getTasks)
  .post(task.postTask);
app.route("/task/:id")
  .get(task.getTask)
  .delete(task.deleteTask)
  .put(task.updateTask);

module.exports = app; //for testing
