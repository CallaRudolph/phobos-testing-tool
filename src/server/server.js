var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
const path = require('path');
var ObjectID = mongodb.ObjectID;
let morgan = require('morgan');
let port = 8080;
let task = require('../app/routes/task'); //maybe this is components instead?
let config = require('config');

//db options
let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}

var TASK_COLLECTION = 'tasks';

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + './../../'));

// var mongoDB = 'mongodb://127.0.0.1/my_database';
// comes from config file now w/ testing
// Mongoose.connect(mongoDB);

//db connection
Mongoose.connect(config.DBHost, options);

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//pase application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get("/", (req, res) => res.json({message: "Welcome to the task list"}));
//maybe this can be component paths??
app.route("/task")
  .get(task.getTasks)
  .post(task.postTask);
app.route("/task/:id")
  .get(task.getTask)
  .delete(task.deleteTask)
  .put(task.updateTask);

app.listen(port);
console.log("listening on port " + port);

module.exports = app; //for testing

// pre mocha //\\\\\\\\\\\\\\\\\\\\\\\\\
var server = app.listen(process.env.PORT || 3000, function (){
  var port = server.address().port;
  console.log("app now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// Get request to view all tasks
app.get('/api/tasks', function(req, res) {
  db.collection(TASK_COLLECTION).find({}).sort({title: 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get tasks.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Post request to add new task
app.post("/api/tasks", function(req, res) {
  var newTask = req.body;
  newTask.createDate = new Date();

  // if (!req.body.title) {
  //   handleError(res, "Invalid user input", "Must provide a title.", 400);
  // }

  db.collection(TASK_COLLECTION).insertOne(newTask, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new task.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

// app.get("/api/tasks/:id", function(req, res) {
//   db.collection(TASK_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
//     if (err) {
//       handleError(res, err.message, "Failed to get task");
//     } else {
//       res.status(200).json(doc);
//     }
//   });
// });

// Delete request to remove task
app.delete("/api/tasks/:id", function(req, res) {
  db.collection(TASK_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete task");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
