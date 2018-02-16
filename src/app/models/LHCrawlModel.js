let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uuid = require('uuid-v4');

// result schema definition
let LHCrawlSchema = new Schema(
  {
    mainUrl: { type: String, required: true },
    url: { type: String, required: true },
    id: { type: String, required: true, default: uuid() },
    // firstPaint: { type: String, required: true },
    // performance: { type: String, required: true },
    // bestPractices: { type: String, required: true },
    // accessibility: { type: String, required: true },
    offscreen: { type: Array, required: true },
    renderSheets: { type: Array, required: true },
    renderScripts: { type: Array, required: true },
    imageSize: { type: Array, required: true },
    optimizeImage: { type: Array, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
LHCrawlSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the ResultSchema for use elsewhere.
module.exports = mongoose.model('LHCrawl', LHCrawlSchema);
