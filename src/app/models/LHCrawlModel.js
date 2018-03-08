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
    accessKeys: { type: Array, required: true },
    ariaAllowedAttr: { type: Array, required: true },
    ariaRequiredAttr: { type: Array, required: true },
    ariaRequiredChildren: { type: Array, required: true },
    ariaRequiredParent: { type: Array, required: true },
    ariaRoles: { type: Array, required: true },
    ariaValidAttrValue: { type: Array, required: true },
    ariaValidAttr: { type: Array, required: true },
    audioCaption: { type: Array, required: true },
    buttonName: { type: Array, required: true },
    bypass: { type: Array, required: true },
    colorContrast: { type: Array, required: true },
    definitionList: { type: Array, required: true },
    dlItem: { type: Array, required: true },
    documentTitle: { type: Array, required: true },
    duplicateID: { type: Array, required: true },
    frameTitle: { type: Array, required: true },
    htmlHasLang: { type: Array, required: true },
    htmlLangValid: { type: Array, required: true },
    imageAlt: { type: Array, required: true },
    inputImageAlt: { type: Array, required: true },
    label: { type: Array, required: true },
    layoutTable: { type: Array, required: true },
    linkName: { type: Array, required: true },
    list: { type: Array, required: true },
    listItem: { type: Array, required: true },
    metaRefresh: { type: Array, required: true },
    objectAlt: { type: Array, required: true },
    tabIndex: { type: Array, required: true },
    tdHeadersAttr: { type: Array, required: true },
    thHasDataCells: { type: Array, required: true },
    validLang: { type: Array, required: true },
    videoCaption: { type: Array, required: true },
    videoDescription: { type: Array, required: true },
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
