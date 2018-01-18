let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// result schema definition
let LHCrawlSchema = new Schema(
  {
    url: { type: String, required: true },
    offscreenHelp: { type: Array, required: true },
    offscreenImages: { type: Array, required: true },
    renderSheetsHelp: { type: Array, required: true },
    renderSheets: { type: Array, required: true },
    renderScriptsHelp: { type: Array, required: true },
    renderScripts: { type: Array, required: true },
    imageSizeHelp: { type: Array, required: true },
    imageSize: { type: Array, required: true },
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
