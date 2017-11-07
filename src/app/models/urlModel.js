let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// site schema definition
let UrlSchema = new Schema(
  {
    url: { type: String, required: true },
    // result: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
UrlSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the SiteSchema for use elsewhere.
module.exports = mongoose.model('url', UrlSchema);
