import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import LHCrawlDelete from './LHCrawlDelete.jsx';
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
      mainUrl: '',
      date: '',
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
    this.handleLHCrawlDelete = this.handleLHCrawlDelete.bind(this);
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

  handleLHCrawlDelete(id) {
    // id sent from LHSummaryDelete comp to create axios Delete request
    axios.delete('crawlLH/' + id)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

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

  componentWillMount() {
    var crawledLighthouse = this.props.local;
    var date = dateFormat(crawledLighthouse[0].createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    this.setState({mainUrl: crawledLighthouse[0].mainUrl});
    this.setState({date: date});

    // PERFORMANCE! //

    // offscreen image mapping
    let offscreenHelpDisplay = [];
    let offscreenImageMapNodes = crawledLighthouse.map(result => {
      if (result.offscreenImages.length < 1) {
        let noHelp = '';
        this.setState({offscreenHelp: noHelp});
        return ("");
      } else {
        offscreenHelpDisplay.push(result.offscreenHelp[0])
        return (<OffscreenImages  key={result.id}
                                  url={result.url}
                                  offscreenImages={result.offscreenImages}/>)
      }
    });
    this.setState({offscreenImagesHelp: offscreenHelpDisplay[0]});
    this.setState({offscreenImages: offscreenImageMapNodes})

    // render sheets mapping
    let renderSheetsHelpDisplay = [];
    let renderSheetsMapNodes = crawledLighthouse.map(result => {
      if (result.renderSheets.length < 1) {
        let noHelp = '';
        this.setState({renderSheetsHelp: noHelp});
        return ("");
      } else {
        renderSheetsHelpDisplay.push(result.renderSheetsHelp[0])
        return (<RenderSheets key={result.id}
                              url={result.url}
                              renderSheets={result.renderSheets}/>)
      }
    });
    this.setState({renderSheetsHelp: renderSheetsHelpDisplay[0]});
    this.setState({renderSheets: renderSheetsMapNodes})

    // render scripts mapping
    let renderScriptsHelpDisplay = [];
    let renderScriptsMapNodes = crawledLighthouse.map(result => {
      if (result.renderScripts.length < 1) {
        let noHelp = '';
        this.setState({renderScriptsHelp: noHelp});
        return ("");
      } else {
        renderScriptsHelpDisplay.push(result.renderScriptsHelp[0])
        return (<RenderScripts key={result.id}
                              url={result.url}
                              renderScripts={result.renderScripts}/>)
      }
    });
    this.setState({renderScriptsHelp: renderScriptsHelpDisplay[0]});
    this.setState({renderScripts: renderScriptsMapNodes})

    // image size mapping
    let imageSizeHelpDisplay = [];
    let imageSizeMapNodes = crawledLighthouse.map(result => {
      if (result.imageSize.length < 1) {
        let noHelp = '';
        this.setState({imageSizeHelp: noHelp});
        return ("");
      } else {
        imageSizeHelpDisplay.push(result.imageSizeHelp[0])
        return (<ImageSize key={result.id}
                            url={result.url}
                            imagesSize={result.imageSize}/>)
      }
    });
    this.setState({imageSizeHelp: imageSizeHelpDisplay[0]});
    this.setState({imageSize: imageSizeMapNodes})

    // optimize image mapping
    let optimizeImageHelpDisplay = [];
    let optimizeImageMapNodes = crawledLighthouse.map(result => {
      if (result.optimizeImage.length < 1) {
        let noHelp = '';
        this.setState({optimizeImageHelp: noHelp});
        return ("");
      } else {
        optimizeImageHelpDisplay.push(result.optimizeImageHelp[0])
        return (<OptimizeImage key={result.id}
                            url={result.url}
                            optimizeImages={result.optimizeImage}/>)
      }
    });
    this.setState({optimizeImageHelp: optimizeImageHelpDisplay[0]});
    this.setState({optimizeImage: optimizeImageMapNodes})

  }

  render() {
    let offscreenDisplay;
    if (this.state.offscreenImagesShow === false && this.state.offscreenImagesHelp === undefined) {
      offscreenDisplay = ''
    } else if (this.state.offscreenImagesShow === false) {
      offscreenDisplay =
        <h4><a href='#/' onClick={ this.viewOffscreenImages }>Offscreen Images </a>{this.state.offscreenImagesHelp}</h4>
    } else {
      offscreenDisplay =
        <div>
          <h4><a href='#/' onClick={ this.hideOffscreenImages }>Offscreen Images </a>{this.state.offscreenImagesHelp}</h4>
          {this.state.offscreenImages}
        </div>
    }

    let renderSheetsDisplay;
    if (this.state.renderSheetsShow === false && this.state.renderSheetsHelp === undefined) {
      renderSheetsDisplay = ''
    } else if (this.state.renderSheetsShow === false) {
      renderSheetsDisplay =
        <h4><a href='#/' onClick={ this.viewRenderSheets }>Render Stylesheets</a> {this.state.renderSheetsHelp}</h4>
    } else {
      renderSheetsDisplay =
        <div>
          <h4><a href='#/' onClick={ this.hideRenderSheets }>Render Stylesheets</a> {this.state.renderSheetsHelp}</h4>
          {this.state.renderSheets}
        </div>
    }

    let renderScriptsDisplay;
    if (this.state.renderScriptsShow === false && this.state.renderScriptsHelp === undefined) {
      renderScriptsDisplay = ''
    } else if (this.state.renderScriptsShow === false) {
      renderScriptsDisplay =
        <h4><a href='#/' onClick={ this.viewRenderScripts }>Render Stylesheets</a> {this.state.renderScriptsHelp}</h4>
    } else {
      renderScriptsDisplay =
        <div>
          <h4><a href='#/' onClick={ this.hideRenderScripts }>Render Scripts</a> {this.state.renderScriptsHelp}</h4>
          {this.state.renderScripts}
        </div>
    }

    let imageSizeDisplay;
    if (this.state.imageSizeShow === false && this.state.imageSizeHelp === undefined) {
      imageSizeDisplay = ''
    } else if (this.state.imageSizeShow === false) {
      imageSizeDisplay =
        <h4><a href='#/' onClick={ this.viewImageSize }>Image Size</a> {this.state.imageSizeHelp}</h4>
    } else {
      imageSizeDisplay =
        <div>
          <h4><a href='#/' onClick={ this.hideImageSize }>Image Size</a> {this.state.imageSizeHelp}</h4>
          {this.state.imageSize}
        </div>
    }

    let optimizeImageDisplay;
    if (this.state.optimizeImageShow === false && this.state.optimizeImageHelp === undefined) {
      optimizeImageDisplay = ''
    } else if (this.state.optimizeImageShow === false) {
      optimizeImageDisplay =
        <h4><a href='#/' onClick={ this.viewOptimizeImage }>Optimize Images</a> {this.state.optimizeImageHelp}</h4>
    } else {
      optimizeImageDisplay =
        <div>
          <h4><a href='#/' onClick={ this.hideOptimizeImage }>Optimize Images</a> {this.state.optimizeImageHelp}</h4>
          {this.state.optimizeImage}
        </div>
    }

    return (
      <div>
        <h2>Quality Assurance Tasks</h2>
        <p>{this.state.mainUrl} / {this.state.date}</p>
        <h3>Performance Opportunities:</h3>
        {offscreenDisplay}
        {renderSheetsDisplay}
        {renderScriptsDisplay}
        {imageSizeDisplay}
        {optimizeImageDisplay}
      </div>
    )
  }
}

export default LHCrawlDetail;
