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

    // // offscreen image mapping
    // let offscreenHelpDisplay = [];
    // let offscreenImageMapNodes = crawledLighthouse.map(result => {
    //   if (result.offscreen[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     offscreenHelpDisplay.push(result.offscreen[0].helpdisplay[0])
    //     return (<OffscreenImages  key={result.id}
    //                               url={result.url}
    //                               offscreen={result.offscreen[0].items}/>)
    //   }
    // });
    //
    // let offscreenDisplay;
    // if (this.state.offscreenImagesShow === false && offscreenHelpDisplay.length < 1) {
    //   offscreenDisplay = ''
    // } else if (this.state.offscreenImagesShow === false) {
    //   offscreenDisplay =
    //     <h5><a href='#/' onClick={ this.viewOffscreenImages }>Offscreen Images </a>{offscreenHelpDisplay[0]}</h5>
    // } else {
    //   offscreenDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideOffscreenImages }>Offscreen Images </a>{offscreenHelpDisplay[0]}</h5>
    //       {offscreenImageMapNodes}
    //     </div>
    // }
    //
    // // render sheets mapping
    // let renderSheetsHelpDisplay = [];
    // let renderSheetsMapNodes = crawledLighthouse.map(result => {
    //   if (result.renderSheets[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     renderSheetsHelpDisplay.push(result.renderSheets[0].helpdisplay)
    //     return (<RenderSheets key={result.id}
    //                           url={result.url}
    //                           renderSheets={result.renderSheets[0].items}/>)
    //   }
    // });
    //
    // let renderSheetsDisplay;
    // if (this.state.renderSheetsShow === false && renderSheetsHelpDisplay.length < 1) {
    //   renderSheetsDisplay = ''
    // } else if (this.state.renderSheetsShow === false) {
    //   renderSheetsDisplay =
    //     <h5><a href='#/' onClick={ this.viewRenderSheets }>Render Stylesheets</a> {renderSheetsHelpDisplay[0]}</h5>
    // } else {
    //   renderSheetsDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideRenderSheets }>Render Stylesheets</a> {renderSheetsHelpDisplay[0]}</h5>
    //       {renderSheetsMapNodes}
    //     </div>
    // }
    //
    // // render scripts mapping
    // let renderScriptsHelpDisplay = [];
    // let renderScriptsMapNodes = crawledLighthouse.map(result => {
    //   if (result.renderScripts[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     renderScriptsHelpDisplay.push(result.renderScripts[0].helpdisplay)
    //     return (<RenderScripts key={result.id}
    //                           url={result.url}
    //                           renderScripts={result.renderScripts[0].items}/>)
    //   }
    // });
    //
    // let renderScriptsDisplay;
    // if (this.state.renderScriptsShow === false && renderScriptsHelpDisplay.length < 1) {
    //   renderScriptsDisplay = ''
    // } else if (this.state.renderScriptsShow === false) {
    //   renderScriptsDisplay =
    //     <h5><a href='#/' onClick={ this.viewRenderScripts }>Render Scripts</a> {renderScriptsHelpDisplay[0]}</h5>
    // } else {
    //   renderScriptsDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideRenderScripts }>Render Scripts</a> {renderScriptsHelpDisplay[0]}</h5>
    //       {renderScriptsMapNodes}
    //     </div>
    // }
    //
    // // image size mapping
    // let imageSizeHelpDisplay = [];
    // let imageSizeMapNodes = crawledLighthouse.map(result => {
    //   if (result.imageSize[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     imageSizeHelpDisplay.push(result.imageSize[0].helpdisplay)
    //     return (<ImageSize key={result.id}
    //                         url={result.url}
    //                         imagesSize={result.imageSize[0].items}/>)
    //   }
    // });
    //
    // let imageSizeDisplay;
    // if (this.state.imageSizeShow === false && imageSizeHelpDisplay.length < 1) {
    //   imageSizeDisplay = ''
    // } else if (this.state.imageSizeShow === false) {
    //   imageSizeDisplay =
    //     <h5><a href='#/' onClick={ this.viewImageSize }>Image Size</a> {imageSizeHelpDisplay[0]}</h5>
    // } else {
    //   imageSizeDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideImageSize }>Image Size</a> {imageSizeHelpDisplay[0]}</h5>
    //       {imageSizeMapNodes}
    //     </div>
    // }
    //
    // // optimize image mapping
    // let optimizeImageHelpDisplay = [];
    // let optimizeImageMapNodes = crawledLighthouse.map(result => {
    //   if (result.optimizeImage[0].helpdisplay.length < 1) {
    //     return ("");
    //   } else {
    //     optimizeImageHelpDisplay.push(result.optimizeImage[0].helpdisplay)
    //     return (<OptimizeImage key={result.id}
    //                           url={result.url}
    //                           optimizeImages={result.optimizeImage[0].items}/>)
    //   }
    // });
    //
    // let optimizeImageDisplay;
    // if (this.state.optimizeImageShow === false && optimizeImageHelpDisplay.length < 1) {
    //   optimizeImageDisplay = ''
    // } else if (this.state.optimizeImageShow === false) {
    //   optimizeImageDisplay =
    //     <h5><a href='#/' onClick={ this.viewOptimizeImage }>Optimize Images</a> {optimizeImageHelpDisplay[0]}</h5>
    // } else {
    //   optimizeImageDisplay =
    //     <div>
    //       <h5><a href='#/' onClick={ this.hideOptimizeImage }>Optimize Images</a> {optimizeImageHelpDisplay[0]}</h5>
    //       {optimizeImageMapNodes}
    //     </div>
    // }

    let offscreenToggle = this.state.offscreenImagesShow;
    let sheetsToggle = this.state.renderSheetsShow;
    let scriptsToggle = this.state.renderScriptsShow;
    let imagesToggle = this.state.imageSizeShow;
    let optimizeToggle = this.state.optimizeImageShow;

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

      let toggleCategory;
      if (toggle === "offscreenImagesShow") {
        toggleCategory = offscreenToggle;
      } else if (toggle === "renderSheetsShow") {
        toggleCategory = sheetsToggle;
      } else if (toggle === "renderScriptsShow") {
        toggleCategory = scriptsToggle;
      } else if (toggle === "imageSizeShow") {
        toggleCategory = imagesToggle;
      } else {
        toggleCategory = optimizeToggle;
      }

      // for view and hide: Expected `onClick` listener to be a function, instead got a value of `string` type. Removed quotes and now the click just doesn't do anything. It's not a function anymore. Tried adding arrow function but no luck.
      let display;
      console.log(viewCategory);
      console.log(hideCategory);
      if (toggleCategory === false && helpRender.length < 1) {
        display = ''
      } else if (toggleCategory === false) {
        display =
          <h5><a href='#/' onClick={ viewCategory }>{verbiage}</a>{helpRender[0]}</h5>
      } else {
        display =
        <div>
          <h5><a href='#/' onClick={() => hideCategory }>{verbiage}</a>{helpRender[0]}</h5>
          {nodes}
        </div>
      }

      return display;
    }

    let offscreenDisplay = parsePerformanceDisplay("offscreen", "OffscreenImages", "offscreenImagesShow", this.viewOffscreenImages, "Offscreen Images ", this.hideOffscreenImages);
    let renderSheetsDisplay = parsePerformanceDisplay("renderSheets", "RenderSheets", "renderSheetsShow", this.viewRenderSheets, "Render Stylesheets ", this.hideRenderSheets);
    let renderScriptsDisplay = parsePerformanceDisplay("renderScripts", "RenderScripts", "renderScriptsShow", this.viewRenderScripts, "Render Scripts ", this.hideRenderScripts);
    let imageSizeDisplay = parsePerformanceDisplay("imageSize", "ImageSize", "imageSizeShow", this.viewImageSize, "Image Size ", this.hideImageSize);
    let optimizeImageDisplay = parsePerformanceDisplay("optimizeImage", "OptimizeImage", "optimizeImageShow", this.viewOptimizeImage, "Optimize Images ", this.hideOptimizeImage);

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
