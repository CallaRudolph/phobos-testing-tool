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
      local: this.props.local,
      mainUrl: '',
      date: '',
      // progressArcs: '',
      offscreenImagesHelp: '',
      offscreenImages: '',
      renderSheetsHelp: '',
      renderSheets: '',
      renderScriptsHelp: '',
      renderScripts: '',
      imageSizeHelp: '',
      imageSize: '',
      optimizeImageHelp: '',
      optimizeImage: '',
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

  componentDidMount() {
    var crawledLighthouse = this.state.local;
    var date = dateFormat(crawledLighthouse[0].createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    this.setState({date: date});
    this.setState({mainUrl: crawledLighthouse[0].mainUrl});

    // // progress arc
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
    // this.setState({progressArcs: progressArcs});

    // PERFORMANCE! //

    // offscreen image mapping
    let offscreenHelpDisplay = [];
    let offscreenImageMapNodes = crawledLighthouse.map(result => {
      if (result.offscreen[0].helpdisplay.length < 1) {
        let noHelp = '';
        this.setState({offscreenHelp: noHelp});
        return ("");
      } else {
        offscreenHelpDisplay.push(result.offscreen[0].helpdisplay[0])
        return (<OffscreenImages  key={result.id}
                                  url={result.url}
                                  offscreenImages={result.offscreen[0].items}/>)
      }
    });
    this.setState({offscreenImagesHelp: offscreenHelpDisplay});
    this.setState({offscreenImages: offscreenImageMapNodes})

    // render sheets mapping
    let renderSheetsHelpDisplay = [];
    let renderSheetsMapNodes = crawledLighthouse.map(result => {
      if (result.renderSheets[0].helpdisplay.length < 1) {
        let noHelp = '';
        this.setState({renderSheetsHelp: noHelp});
        return ("");
      } else {
        renderSheetsHelpDisplay.push(result.renderSheets[0].helpdisplay)
        return (<RenderSheets key={result.id}
                              url={result.url}
                              renderSheets={result.renderSheets[0].items}/>)
      }
    });
    this.setState({renderSheetsHelp: renderSheetsHelpDisplay});
    this.setState({renderSheets: renderSheetsMapNodes})

    // render scripts mapping
    let renderScriptsHelpDisplay = [];
    let renderScriptsMapNodes = crawledLighthouse.map(result => {
      if (result.renderScripts[0].helpdisplay.length < 1) {
        let noHelp = '';
        this.setState({renderScriptsHelp: noHelp});
        return ("");
      } else {
        renderScriptsHelpDisplay.push(result.renderScripts[0].helpdisplay)
        return (<RenderScripts key={result.id}
                              url={result.url}
                              renderScripts={result.renderScripts[0].items}/>)
      }
    });
    this.setState({renderScriptsHelp: renderScriptsHelpDisplay});
    this.setState({renderScripts: renderScriptsMapNodes})

    // image size mapping
    let imageSizeHelpDisplay = [];
    let imageSizeMapNodes = crawledLighthouse.map(result => {
      if (result.imageSize[0].helpdisplay.length < 1) {
        let noHelp = '';
        this.setState({imageSizeHelp: noHelp});
        return ("");
      } else {
        imageSizeHelpDisplay.push(result.imageSize[0].helpdisplay)
        return (<ImageSize key={result.id}
                            url={result.url}
                            imagesSize={result.imageSize[0].items}/>)
      }
    });
    this.setState({imageSizeHelp: imageSizeHelpDisplay});
    this.setState({imageSize: imageSizeMapNodes})

    // optimize image mapping
    let optimizeImageHelpDisplay = [];
    let optimizeImageMapNodes = crawledLighthouse.map(result => {
      if (result.optimizeImage[0].helpdisplay.length < 1) {
        let noHelp = '';
        this.setState({optimizeImageHelp: noHelp});
        return ("");
      } else {
        optimizeImageHelpDisplay.push(result.optimizeImage[0].helpdisplay)
        return (<OptimizeImage key={result.id}
                              url={result.url}
                              optimizeImages={result.optimizeImage[0].items}/>)
      }
    });
    this.setState({optimizeImageHelp: optimizeImageHelpDisplay});
    this.setState({optimizeImage: optimizeImageMapNodes})

  }

  render() {
    let offscreenDisplay;
    if (this.state.offscreenImagesShow === false && this.state.offscreenImagesHelp.length < 1) {
      offscreenDisplay = ''
    } else if (this.state.offscreenImagesShow === false) {
      offscreenDisplay =
        <h5><a href='#/' onClick={ this.viewOffscreenImages }>Offscreen Images </a>{this.state.offscreenImagesHelp[0]}</h5>
    } else {
      offscreenDisplay =
        <div>
          <h5><a href='#/' onClick={ this.hideOffscreenImages }>Offscreen Images </a>{this.state.offscreenImagesHelp[0]}</h5>
          {this.state.offscreenImages}
        </div>
    }

    let renderSheetsDisplay;
    if (this.state.renderSheetsShow === false && this.state.renderSheetsHelp.length < 1) {
      renderSheetsDisplay = ''
    } else if (this.state.renderSheetsShow === false) {
      renderSheetsDisplay =
        <h5><a href='#/' onClick={ this.viewRenderSheets }>Render Stylesheets</a> {this.state.renderSheetsHelp[0]}</h5>
    } else {
      renderSheetsDisplay =
        <div>
          <h5><a href='#/' onClick={ this.hideRenderSheets }>Render Stylesheets</a> {this.state.renderSheetsHelp[0]}</h5>
          {this.state.renderSheets}
        </div>
    }

    let renderScriptsDisplay;
    if (this.state.renderScriptsShow === false && this.state.renderScriptsHelp. length < 1) {
      renderScriptsDisplay = ''
    } else if (this.state.renderScriptsShow === false) {
      renderScriptsDisplay =
        <h5><a href='#/' onClick={ this.viewRenderScripts }>Render Scripts</a> {this.state.renderScriptsHelp[0]}</h5>
    } else {
      renderScriptsDisplay =
        <div>
          <h5><a href='#/' onClick={ this.hideRenderScripts }>Render Scripts</a> {this.state.renderScriptsHelp[0]}</h5>
          {this.state.renderScripts}
        </div>
    }

    let imageSizeDisplay;
    if (this.state.imageSizeShow === false && this.state.imageSizeHelp.length < 1) {
      imageSizeDisplay = ''
    } else if (this.state.imageSizeShow === false) {
      imageSizeDisplay =
        <h5><a href='#/' onClick={ this.viewImageSize }>Image Size</a> {this.state.imageSizeHelp[0]}</h5>
    } else {
      imageSizeDisplay =
        <div>
          <h5><a href='#/' onClick={ this.hideImageSize }>Image Size</a> {this.state.imageSizeHelp[0]}</h5>
          {this.state.imageSize}
        </div>
    }

    let optimizeImageDisplay;
    if (this.state.optimizeImageShow === false && this.state.optimizeImageHelp.length < 1) {
      optimizeImageDisplay = ''
    } else if (this.state.optimizeImageShow === false) {
      optimizeImageDisplay =
        <h5><a href='#/' onClick={ this.viewOptimizeImage }>Optimize Images</a> {this.state.optimizeImageHelp[0]}</h5>
    } else {
      optimizeImageDisplay =
        <div>
          <h5><a href='#/' onClick={ this.hideOptimizeImage }>Optimize Images</a> {this.state.optimizeImageHelp[0]}</h5>
          {this.state.optimizeImage}
        </div>
    }

    return (
      <div>
        <h4>Quality Assurance Tasks</h4>
        <h5>{this.state.mainUrl} on {this.state.date}</h5>
        <h4>Performance Opportunities:</h4>
        {offscreenDisplay}
        {renderSheetsDisplay}
        {renderScriptsDisplay}
        {imageSizeDisplay}
        {optimizeImageDisplay}
        {/* {this.state.progressArcs} */}
      </div>
    )
  }
}

export default LHCrawlDetail;
