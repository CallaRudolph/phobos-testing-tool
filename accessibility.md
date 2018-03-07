it's tough to tell if the start index would change for each of these like it does with Performance, as most websites I have tested so far PASS most accessibility items and therefore don't have a "details" subcategory to reference. Leaving the start index out for now.

routes/crawl.js within let url of urls blob:

let accOpp = jsonBlob.reportCategories[2].audits;

function parseLHAccessibility (name) {
  let data = {
    helpdisplay: [],
    items: []
  };

  for (var i = 0; i < accOpp.length; i++) {
    if (accOpp[i].id === name && accOpp[i].score < 100) {
      var help = accOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
      data.helpdisplay.push(help);
      var items = accOpp[i].result.details.items;
      if (items.length > 0) {
        for (var j = 0; j < items.length; j++) {
          var item = items[j].snippet;
          data.items.push(item)
        }
      }
    }
  }

  return data;
}

let accessKeys = parseLHAccessibility("accesskeys");
let ariaAllowedAttr = parseLHAccessibility("aria-allowed-attr");
let ariaRequiredAttr = parseLHAccessibility("aria-required-attr");
let ariaRequiredChildren = parseLHAccessibility("aria-required-children");
let ariaRequiredParent = parseLHAccessibility("aria-required-parent");
let ariaRoles = parseLHAccessibility("aria-roles");
let ariaValidAttrValue = parseLHAccessibility("aria-valid-attr-value");
let ariaValidAttr = parseLHAccessibility("aria-valid-attr");
let audioCaption = parseLHAccessibility("audio-caption");
let buttonName = parseLHAccessibility("button-name");
let bypass = parseLHAccessibility("bypass");
let colorContrast = parseLHAccessibility("color-contrast");
let definitionList = parseLHAccessibility("definition-list");
let dlItem = parseLHAccessibility("dlitem");
let documentTitle = parseLHAccessibility("document-title");
let duplicateID = parseLHAccessibility("duplicate-id");
let frameTitle = parseLHAccessibility("frame-title");
let htmlHasLang = parseLHAccessibility("html-has-lang");
let htmlLangValid = parseLHAccessibility("html-lang-valid");
let imageAlt = parseLHAccessibility("image-alt");
let inputImageAlt = parseLHAccessibility("input-image-alt");
let label = parseLHAccessibility("label");
let layoutTable = parseLHAccessibility("layout-table");
let linkName = parseLHAccessibility("link-name");
let list = parseLHAccessibility("list");
let listItem = parseLHAccessibility("list-item");
let metaRefresh = parseLHAccessibility("meta-refresh");
let metaViewport = parseLHAccessibility("meta-viewport");
let objectAlt = parseLHAccessibility("object-alt");
let tabIndex = parseLHAccessibility("tabindex");
let tdHeadersAttr = parseLHAccessibility("td-headers-attr");
let thHasDataCells = parseLHAccessibility("ht-has-data-cells");
let validLang = parseLHAccessibility("valid-lang");
let videoCaption = parseLHAccessibility("video-caption");
let videoDescription = parseLHAccessibility("video-description");


within crawlLHResult:

"accessKeys":accessKeys,
"ariaAllowedAttr":ariaAllowedAttr,
"ariaRequiredAttr":ariaRequiredAttr,
"ariaRequiredChildren":ariaRequiredChildren,
"ariaRequiredParent":ariaRequiredParent,
"ariaRoles":ariaRoles,
"ariaValidAttrValue":ariaValidAttrValue,
"ariaValidAttr":ariaValidAttr,
"audioCaption":audioCaption,
"buttonName":buttonName,
"bypass":bypass,
"colorContrast":colorContrast,
"definitionList":definitionList,
"dlItem":dlItem,
"documentTitle":documentTitle,
"duplicateID":duplicateID,
"frameTitle":frameTitle,
"htmlHasLang":htmlHasLang,
"htmlLangValid":htmlLangValid,
"imageAlt":imageAlt,
"inputImageAlt":inputImageAlt,
"label":label,
"layoutTable":layoutTable,
"linkName":linkName,
"list":list,
"listItem":listItem,
"metaRefresh":metaRefresh,
"metaViewport":metaViewport,
"objectAlt":objectAlt,
"tabIndex":tabIndex,
"tdHeadersAttr":tdHeadersAttr,
"thHasDataCells":thHasDataCells,
"validLang":validLang,
"videoCaption":videoCaption,
"videoDescription":videoDescription,

// the following could have a score < 100 but not contain any items (group "manual-a11y-checks"). Exclude them?
"logical-tab-order"
"focusable-controls"
"managed-focus"
"focus-traps"
"custom-controls-labels"
"custom-controls-roles"
"visual-order-follows-dom"
"offscreen-content-hidden"
"heading-levels"
"use-landmarks"

----------------

to add on LHCrawlModel:
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
