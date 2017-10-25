const express = require('express');
var mongodb = require('mongodb');
var Mongoose = require('mongoose');

var TASKS_COLLECTION = 'tasks';

const app = express();

app.use(express.static(__dirname + './../../'));

var mongoDB = 'mongodb://127.0.0.1/my_database';

Mongoose.connect(mongoDB);

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var server = app.listen(process.env.PORT || 3000, function (){
  var port = server.address().port;
  console.log("app now running on port", port);
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
