var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');
const path = require('path');

var TASK_COLLECTION = 'tasks';

var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + './../../'));

var mongoDB = 'mongodb://127.0.0.1/my_database';

Mongoose.connect(mongoDB);

var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var server = app.listen(process.env.PORT || 3000, function (){
  var port = server.address().port;
  console.log("app now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.get('/api/tasks', function(req, res) {
  db.collection(TASK_COLLECTION).find({}).sort({title: 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get tasks.");
    } else {
      res.status(200).json(docs);
    }
  });
});

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

app.get("/api/tasks/:id", function(req, res) {
  db.collection(TASK_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get task");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.delete("/api/tasks/:id", function(req, res) {
  db.collection(TASK_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete task");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
