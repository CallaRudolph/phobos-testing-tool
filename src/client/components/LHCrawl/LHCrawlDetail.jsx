import React, { Component } from "react";
import ProgressArcs from './ProgressArcs.jsx';
import Performance from './Performance/Performance.jsx';
import Accessibility from './Accessibility/Accessibility.jsx';
var dateFormat = require('dateformat');

class LHCrawlDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfChildVisible: false,
      accChildVisible: false
    };
    this.onClickPerf = this.onClickPerf.bind(this);
    this.onClickAcc = this.onClickAcc.bind(this);
  }

  onClickPerf() {
    this.setState(prevState => ({ perfChildVisible: !prevState.perfChildVisible }));
  }

  onClickAcc() {
    this.setState(prevState => ({ accChildVisible: !prevState.accChildVisible }));
  }

  parsePerformanceDisplay(category, verbiage) {
    let crawledLighthouse = this.props.local;
    let helpRender = [];
    let key = [];

    let nodes = crawledLighthouse.map(result => {
      helpRender.push(result[category][0].helpdisplay[0])
      key.push(result.id);
      return([result.url, [result[category][0].items]])
    });

    return([verbiage, helpRender[0], nodes, key])
  }

  parseAccessibilityDisplay(category, verbiage) {
    let crawledLighthouse = this.props.local;
    let helpRender = [];
    let key = [];

    let nodes = crawledLighthouse.map(result => {
      helpRender.push(result[category][0].helpdisplay[0])
      key.push(result.id);
      return([result.url, [result[category][0].items]])
    });

    return([verbiage, helpRender[0], nodes, key])
  }

  render() {
    let crawledLighthouse = this.props.local;
    let mainUrl = crawledLighthouse[0].mainUrl;
    let date = dateFormat(crawledLighthouse[0].createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    // progress arcs
    // let progressArcs = crawledLighthouse.map(result => {
    //   let paintScore = parseInt(result.firstPaint);
    //   let performanceScore = parseInt(result.performance);
    //   let bestPracticeScore = parseInt(result.bestPractices);
    //   let accessibilityScore = parseInt(result.accessibility);
    //   return (<ProgressArcs key={result.id}
    //                         url={result.url}
    //                         paintScore={paintScore}
    //                         performanceScore={performanceScore}
    //                         bestPracticeScore={bestPracticeScore}
    //                         accessibilityScore={accessibilityScore}/>)
    // });

    /////////////// PERFORMANCE DISPLAY

    let perfArray = [["offscreen", "Lazy-load offscreen images "], ["renderSheets", "Reduce render-blocking stylesheets "], ["renderScripts", "Reduce render-blocking scripts "], ["imageSize", "Properly size images "], ["optimizeImage", "Optimize images "]];

    let perfDisplayArray = [];
    perfArray.map(individual => {
      let individualDisplay = this.parsePerformanceDisplay(individual[0], individual[1]);
      perfDisplayArray.push(individualDisplay);
    });

    let performanceDisplay = perfDisplayArray.map(function(performance, index) {
        // because this is creating multiple subcomponents for each performance area, the key is not unique here. Not sure how to create a unique key when sending through multiple maps for each performance item. Get a lovely warning message.
      let display;
      if (performance[1] === undefined) {
        // this hides a performance item from showing if no items were found for it.
        display = ''
      } else {
        display =
          <div>
            <Performance
              verbiage={performance[0]}
              helpRender={performance[1]}
              nodes={performance[2]}
              key={index}
            />
          </div>
      }
      return (display)
    });
    //////////// END PERFORMANCE DISPLAY

    ///////// ACCESSIBILITY DISPLAY
    let accArray = [["accessKeys", "Access key values are not unique "], ["ariaAllowedAttr", "aria attributes match their roles "], ["ariaRequiredAttr", "Roles have required aria attributes "], ["ariaRequiredChildren", "Elements with roles that require children's roles are present "], ["ariaRequiredParent", "Roles are contained by their required parent element "], ["ariaRoles", "aria roles must have valid values "], ["ariaValidAttrValue", "aria attributes have valid values "], ["ariaValidAttr", "aria attributes are valid and not misspelled "], ["audioCaption", "Audio elements are missing a track element with captions "], ["buttonName", "Buttons have an accessible name "], ["bypass", "The page contains a heading, skip link, or landmark region "], ["colorContrast", "Background and foreground colors do not have a sufficient contrast ratio "], ["definitionList", "`<dl>`'s do not contain only properly-ordered `<dt>` and `<dd>` groups, `<script>` or `<template>` elements "], ["dlItem", "Definition list items are not wrapped in `<dl>` elements "], ["documentTitle", "Document has a `<title>` element "], ["duplicateID", "ID attributes on the page are unique "], ["frameTitle", "`<frame>` or `<iframe>` elements do not have a title "], ["htmlHasLang", "`<html>` element has a `[lang]` attribute "], ["htmlLangValid", "`<html>` element has a valid value for its `[lang]` attribute "], ["imageAlt", "Image elements have `[alt]` attributes "], ["inputImageAlt", "`<input type=\"image\">` elements do not have `[alt]` text "], ["label", "Form elements have associated labels "], ["layoutTable", "Presentational `<table>` elements do not avoid using `<th>`, `<caption>` or the `[summary]` attribute "], ["linkName", "Links have a discernible name "], ["list", "Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>` "], ["listItem", "List items (`<li>`) are contained within `<ul>` or `<ol>` parent elements "], ["metaRefresh", "The document uses `<meta http-equiv=\"refresh\">` "], ["objectAlt", "`<object>` elements do not have `[alt]` text "], ["tabIndex", "Some elements have a `[tabindex]` value greater than 0 "], ["tdHeadersAttr", "Cells in a `<table>` element that use the `[headers]` attribute refers to other cells of that same table "], ["thHasDataCells", "`<th>` elements and elements with `[role=\"columnheader\"/\"rowheader\"]` do not have data cells they describe "], ["validLang", "`[lang]` attributes do not have a valid value "], ["videoCaption", "`<video>` elements do not contain a `<track>` element with `[kind=\"captions\"]` "], ["videoDescription", "`<video>` elements do not contain a `<track>` element with `[kind=\"description\"]` "]];

    let accDisplayArray = [];
    accArray.map(individual => {
      let individualDisplay = this.parseAccessibilityDisplay(individual[0], individual[1]);
      accDisplayArray.push(individualDisplay);
    });

    let accessibilityDisplay = accDisplayArray.map(function(accessibility, index) {
        // because this is creating multiple subcomponents for each performance area, the key is not unique here. Not sure how to create a unique key when sending through multiple maps for each performance item. Get a lovely warning message.
      let display;
      if (accessibility[1] === undefined) {
        // this hides an accessibility item from showing if no items were found for it.
        display = ''
      } else {
        display =
          <div>
            <Accessibility
              verbiage={accessibility[0]}
              helpRender={accessibility[1]}
              nodes={accessibility[2]}
              key={index}
            />
          </div>
      }
      return (display)
    });

    ////////// END ACCESSIBILITY DISPLAY

    return (
      <div>
        <h4>Quality Assurance Tasks</h4>
        <h5>Crawled Lighthouse Results for <u>{mainUrl}</u> on {date}</h5>
        <br/>
        {/* {progressArcs} */}

        <h5><i><a href='#/' onClick={() => this.onClickPerf()}>
          Performance Opportunities
        </a></i></h5>
        { this.state.perfChildVisible && performanceDisplay }
        <br/>

        <h5><i><a href='#/' onClick={() => this.onClickAcc()}>
          Accessibility Opportunities
        </a></i></h5>
        { this.state.accChildVisible && accessibilityDisplay }
      </div>
    )
  }
}

export default LHCrawlDetail;
