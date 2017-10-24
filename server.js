const express = require('express');
const app = express();

app.use(express.static('build'));

var server = app.listen(process.env.PORT || 3000, function (){
  var port = server.address().port;
  console.log("app now running on port", port);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build' + 'index.html'));
});
//template.ejs??


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
