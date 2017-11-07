let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// task schema definition
let TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    time: { type: String, required: true },
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
TaskSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the TaskSchema for use elsewhere.
module.exports = mongoose.model('task', TaskSchema);
