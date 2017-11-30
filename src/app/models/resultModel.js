let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// result schema definition
let ResultSchema = new Schema(
  {
    url: { type: String, required: true },
    firstPaint: { type: String, required: true },
    performance: { type: String, required: true },
    bestPractices: { type: String, required: true },
    accessibility: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
ResultSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ResultSchema for use elsewhere.
module.exports = mongoose.model('result', ResultSchema);
