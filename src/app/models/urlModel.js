let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// site schema definition
let UrlSchema = new Schema(
  {
    url: { type: String, required: true },
  },
  {
    versionKey: false
  }
);

//Exports the SiteSchema for use elsewhere.
module.exports = mongoose.model('url', UrlSchema);
