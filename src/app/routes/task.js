let Task = require('../models/taskModel');

// GET /task route to retrieve all the tasks.
function getTasks(req, res) {
  //Query the DB and if no errors, send all the tasks
  let query = Task.find({});
  query.exec((err, tasks) => {
    if(err) res.send(err);
    //if no errors, send them back to the client
    res.json(tasks);
  });
}

//POST /task to save a new task
function postTask(req, res) {
  //creates a new task
  var newTask = new Task(req.body);
  //save it into the DB
  newTask.save((err,task) => {
    if(err) {
      res.send(err);
    }
    else { //if no errors, send it back to the client
      res.json({message: "task successfully added", task });
    }
  });
}

//GET /task/:id route to retrieve a task given its id
function getTask(req, res) {
  Task.findById(req.params.id, (err, task) => {
    if(err) res.send(err);
    //if no errors, send it back to the client
    res.json(task);
  });
}

//DELETE /task/:id to delete a task given its id
function deleteTask(req, res) {
  Task.remove({_id : req.params.id}, (err, result) => {
    res.json({ message: "task successfully deleted", result });
  });
}

//PUT /task/:id to update a task given its id
function updateTask(req, res) {
  Task.findById({_id: req.params.id}, (err, task) => {
    if(err) res.send(err);
    Object.assign(task, req.body).save((err, task) => {
      if(err) res.send(err);
      res.json({ message: 'task updated!', task });
    });
  });
}

//export all the functions
module.exports = { getTasks, postTask, getTask, deleteTask, updateTask };
