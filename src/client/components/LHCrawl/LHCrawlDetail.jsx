import React, { Component } from "react";
import LHCrawlDelete from './LHCrawlDelete.jsx';
import ProgressArcs from './ProgressArcs.jsx';
import Performance from './Performance.jsx';
var dateFormat = require('dateformat');

class LHCrawlDetail extends Component {
  constructor(props) {
    super(props);
    // this.handleLHCrawlDelete = this.handleLHCrawlDelete.bind(this);
  }

  // handleLHCrawlDelete(id) {
  //   // id sent from LHSummaryDelete comp to create axios Delete request
  //   axios.delete('crawlLH/' + id)
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });
  // }

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

    let perfArray = [["offscreen", "Offscreen Images "], ["renderSheets", "Render Stylesheets "], ["renderScripts", "Render Scripts "], ["imageSize", "Image Size "], ["optimizeImage", "Optimize Images "]];

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

    return (
      <div>
        <h4>Quality Assurance Tasks</h4>
        <h5>Crawled Lighthouse Results for <u>{mainUrl}</u> on {date}</h5>
        <h5><i>Performance Opportunities:</i></h5>
        {/* {progressArcs} */}
        {performanceDisplay}
      </div>
    )
  }
}

export default LHCrawlDetail;
