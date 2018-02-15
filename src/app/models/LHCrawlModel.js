let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uuid = require('uuid-v4');

// result schema definition
let LHCrawlSchema = new Schema(
  {
    mainUrl: { type: String, required: true },
    url: { type: String, required: true },
    id: { type: String, required: true, default: uuid() },
    firstPaint: { type: String, required: true },
    performance: { type: String, required: true },
    bestPractices: { type: String, required: true },
    accessibility: { type: String, required: true },
    // offscreenHelp: { type: Array },
    // offscreenImages: { type: Array },
    // renderSheetsHelp: { type: Array },
    // renderSheets: { type: Array },
    // renderScriptsHelp: { type: Array },
    // renderScripts: { type: Array },
    // imageSizeHelp: { type: Array },
    // imageSize: { type: Array },
    // optimizeImageHelp: { type: Array },
    // optimizeImage: { type: Array },
    offscreen: { type: Array, required: true },
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
