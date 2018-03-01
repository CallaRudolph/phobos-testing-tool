import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import LHCrawlDelete from './LHCrawlDelete.jsx';
import ProgressArcs from './ProgressArcs.jsx';
import OffscreenImages from './Performance/OffscreenImages.jsx';
import RenderSheets from './Performance/RenderSheets.jsx';
import RenderScripts from './Performance/RenderScripts.jsx';
import ImageSize from './Performance/ImageSize.jsx';
import OptimizeImage from './Performance/OptimizeImage.jsx';
var dateFormat = require('dateformat');

class LHCrawlDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offscreenImagesShow: false,
      renderSheetsShow: false,
      renderScriptsShow: false,
      imageSizeShow: false,
      optimizeImageShow: false
    };
    // this.handleLHCrawlDelete = this.handleLHCrawlDelete.bind(this);
    this.viewOffscreenImages = this.viewOffscreenImages.bind(this);
    this.hideOffscreenImages = this.hideOffscreenImages.bind(this);
    this.viewRenderSheets = this.viewRenderSheets.bind(this);
    this.hideRenderSheets = this.hideRenderSheets.bind(this);
    this.viewRenderScripts = this.viewRenderScripts.bind(this);
    this.hideRenderScripts = this.hideRenderScripts.bind(this);
    this.viewImageSize = this.viewImageSize.bind(this);
    this.hideImageSize = this.hideImageSize.bind(this);
    this.viewOptimizeImage = this.viewOptimizeImage.bind(this);
    this.hideOptimizeImage = this.hideOptimizeImage.bind(this);
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

  // toggle for individual LH item views w/ boolean state
  viewOffscreenImages() {
    this.setState({
      offscreenImagesShow: true
    });
  }

  hideOffscreenImages() {
    this.setState({
      offscreenImagesShow: false
    });
  }

  viewRenderSheets() {
    this.setState({
      renderSheetsShow: true
    });
  }

  hideRenderSheets() {
    this.setState({
      renderSheetsShow: false
    });
  }

  viewRenderScripts() {
    this.setState({
      renderScriptsShow: true
    });
  }

  hideRenderScripts() {
    this.setState({
      renderScriptsShow: false
    });
  }

  viewImageSize() {
    this.setState({
      imageSizeShow: true
    });
  }

  hideImageSize() {
    this.setState({
      imageSizeShow: false
    });
  }

  viewOptimizeImage() {
    this.setState({
      optimizeImageShow: true
    });
  }

  hideOptimizeImage() {
    this.setState({
      optimizeImageShow: false
    });
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

    function parsePerformanceDisplay(category, ChildComponent, toggle, viewCategory, verbiage, hideCategory) {
      let helpRender = [];

      let nodes = crawledLighthouse.map(result => {
        if(result[category][0].helpdisplay.length < 1) {
          return("");
        } else {
          helpRender.push(result[category][0].helpdisplay[0])
          return (<ChildComponent key={result.id}
                                  url={result.url}
                                  category={result[category][0].items}/>)
        }
      });

      let display;
      if (toggle === false && helpRender.length < 1) {
        display = ''
      } else if (toggle === false) {
        display =
          <h5><a href='#/' onClick={ viewCategory }>{verbiage}</a>{helpRender[0]}</h5>
      } else {
        display =
        <div>
          <h5><a href='#/' onClick={ hideCategory }>{verbiage}</a>{helpRender[0]}</h5>
          {nodes}
        </div>
      }

      return display;
    }

    let offscreenDisplay = parsePerformanceDisplay("offscreen", OffscreenImages, this.state.offscreenImagesShow, this.viewOffscreenImages, "Offscreen Images ", this.hideOffscreenImages);

    let renderSheetsDisplay = parsePerformanceDisplay("renderSheets", RenderSheets, this.state.renderSheetsShow, this.viewRenderSheets, "Render Stylesheets ", this.hideRenderSheets);
    let renderScriptsDisplay = parsePerformanceDisplay("renderScripts", RenderScripts, this.state.renderScriptsShow, this.viewRenderScripts, "Render Scripts ", this.hideRenderScripts);
    let imageSizeDisplay = parsePerformanceDisplay("imageSize", ImageSize, this.state.imageSizeShow, this.viewImageSize, "Image Size ", this.hideImageSize);
    let optimizeImageDisplay = parsePerformanceDisplay("optimizeImage", OptimizeImage, this.state.optimizeImageShow, this.viewOptimizeImage, "Optimize Images ", this.hideOptimizeImage);

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
        {/* {progressArcs} */}
      </div>
    )
  }
}

export default LHCrawlDetail;
