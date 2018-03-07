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
    // array
    // let category = array[0];
    // let toggle = array[1];
    // let viewCategory = array[2];
    // let verbiage = array[3];
    // let hideCategory = array[4];

    // console.log(category, viewCategory, verbiage, hideCategory);
    let crawledLighthouse = this.props.local;
    let helpRender = [];
    let key = [];

    let nodes = crawledLighthouse.map(result => {
      if(result[category][0].helpdisplay.length < 1) {
        return("");
      } else {
        helpRender.push(result[category][0].helpdisplay[0])
        key.push(result.id);
        return([result.url, [result[category][0].items]])

        // (<Performance key={result.id}
        //                       url={result.url}
        //                       category={result[category][0].items}/>)
      }
    });

    let display;
    if (helpRender.length < 1) {
      display = ''
    } else {
      display =
      <div>
        <Performance key={key}
                    verbiage={verbiage}
                    helpRender={helpRender[0]}
                    nodes={nodes}
                    />
      </div>
    }

    return display;
  }

  test(performanceItems) {
    // console.log(performanceItems);
    // let testy = Object.values(performanceItems);
    // let testy2;
    // for (var i = 0; i < testy.length; i++) {
    //   let array = [];
    //   for (var key in testy[i]) {
    //     array.push(testy[i][key]);
    //   }
    //   // testy2 = this.parsePerformanceDisplay(array);
    //   console.log(array);
    //   // for (var j = 0; j < array.length)
    // }
    // // console.log(testy2);
    // // return testy2;
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

    let offscreenDisplay = this.parsePerformanceDisplay("offscreen", "Offscreen Images ");
    let renderSheetsDisplay = this.parsePerformanceDisplay("renderSheets", "Render Stylesheets ");
    let renderScriptsDisplay = this.parsePerformanceDisplay("renderScripts", "Render Scripts ");
    let imageSizeDisplay = this.parsePerformanceDisplay("imageSize", "Image Size ");
    let optimizeImageDisplay = this.parsePerformanceDisplay("optimizeImage", "Optimize Images ");

    // var performanceItems = {
    //   offscreen:[
    //     "offscreen", this.state.offscreenImagesShow, this.viewOffscreenImages, "Offscreen Images ", this.hideOffscreenImages
    //   ],
    //   renderSheets:[
    //     "renderSheets", this.state.renderSheetsShow, this.viewRenderSheets, "Render Stylesheets ", this.hideRenderSheets
    //   ],
    //   renderScripts:[
    //     "renderScripts", this.state.renderScriptsShow, this.viewRenderScripts, "Render Scripts ", this.hideRenderScripts
    //   ],
    //   imageSize:[
    //     "imageSize", this.state.imageSizeShow, this.viewImageSize, "Image Size ", this.hideImageSize
    //   ],
    //   optimizeImage:[
    //     "optimizeImage", this.state.optimizeImageShow, this.viewOptimizeImage, "Optimize Images ", this.hideOptimizeImage
    //   ]
    // };
    //
    // let tester = this.test(performanceItems);



    return (
      <div>
        <h4>Quality Assurance Tasks</h4>
        <h5>Crawled Lighthouse Results for <u>{mainUrl}</u> on {date}</h5>
        <h5><i>Performance Opportunities:</i></h5>
        {offscreenDisplay}
        {renderSheetsDisplay}
        {renderScriptsDisplay}
        {imageSizeDisplay}
        {optimizeImageDisplay}
        {/* {tester} */}
        {/* {progressArcs} */}
      </div>
    )
  }
}

export default LHCrawlDetail;
