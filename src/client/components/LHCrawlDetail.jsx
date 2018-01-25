import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import LHCrawlDelete from './LHCrawlDelete.jsx';
import OffscreenImages from './OffscreenImages.jsx';
var dateFormat = require('dateformat');

class LHCrawlDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offscreenImages: '',
      offscreenHelp: '',
      renderSheets: '',
      renderSheetsHelp: '',
      renderScripts: '',
      renderScriptsHelp: '',
      imageSize: '',
      imageSizeHelp: '',
      optimizeImage: '',
      optimizeImageHelp: '',
      offscreenMap: ''
      // imageAlt: '',
      // imageAltHelp: ''
    };
    this.handleLHCrawlDelete = this.handleLHCrawlDelete.bind(this);
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

  componentWillMount() {
    var crawledLighthouse = this.props.local;

    // PERFORMANCE! //

    // offscreen images
    let offscreenImageNodes = crawledLighthouse.map(result => {
      if (result.offscreenImages.length < 1) {
        return ("");
      } else {
        return (" " + result.url + ": " + result.offscreenImages)
      }
    });
    this.setState({offscreenImages: offscreenImageNodes});
    let offscreenHelpDisplay = [];
    let offscreenHelpNodes = crawledLighthouse.map(result => {
      if (result.offscreenHelp.length > 0){
        offscreenHelpDisplay.push(result.offscreenHelp[0])
      }
      return (result)
    });
    this.setState({offscreenHelp: offscreenHelpDisplay[0]});

    // offscreen image mapping test
    let offscreenImageMapNodes = crawledLighthouse.map(result => {
      if (result.offscreenImages.length < 1) {
        return ("");
      } else {
        return (<OffscreenImages  key={result.offscreenImages}
                                  help={result.offscreenHelp[0]}
                                  url={result.url}
                                  offscreenImages={result.offscreenImages}/>)
      }
    });
    this.setState({offscreenMap: offscreenImageMapNodes})




    // render sheets
    let renderSheetsNodes = crawledLighthouse.map(result => {
      if (result.renderSheets.length < 1) {
        return ("");
      } else {
        return (" " + result.url + ": " + result.renderSheets)
      }
    });
    this.setState({renderSheets: renderSheetsNodes});
    let renderSheetsHelpDisplay = [];
    let renderSheetsHelpNodes = crawledLighthouse.map(result => {
      if (result.renderSheetsHelp.length > 0){
        renderSheetsHelpDisplay.push(result.renderSheetsHelp[0])
      }
      return (result)
    });
    this.setState({renderSheetsHelp: renderSheetsHelpDisplay[0]});

    // render scripts
    let renderScriptsNodes = crawledLighthouse.map(result => {
      if (result.renderScripts.length < 1) {
        return ("");
      } else {
        return (" " + result.url + ": " + result.renderScripts)
      }
    });
    this.setState({renderScripts: renderScriptsNodes});
    let renderScriptsHelpDisplay = [];
    let renderScriptsHelpNodes = crawledLighthouse.map(result => {
      if (result.renderScriptsHelp.length > 0){
        renderScriptsHelpDisplay.push(result.renderScriptsHelp[0])
      }
      return (result)
    });
    this.setState({renderScriptsHelp: renderScriptsHelpDisplay[0]});

    // image size
    let imageSizeNodes = crawledLighthouse.map(result => {
      if (result.imageSize.length < 1) {
        return ("");
      } else {
        return (" " + result.url + ": " + result.imageSize)
      }
    });
    this.setState({imageSize: imageSizeNodes});
    let imageSizeHelpDisplay = [];
    let imageSizeHelpNodes = crawledLighthouse.map(result => {
      if (result.imageSizeHelp.length > 0){
        imageSizeHelpDisplay.push(result.imageSizeHelp[0])
      }
      return (result)
    });
    this.setState({imageSizeHelp: imageSizeHelpDisplay[0]});

    // optimize image
    let optimizeImageNodes = crawledLighthouse.map(result => {
      if (result.optimizeImage.length < 1) {
        return ("");
      } else {
        return (" " + result.url + ": " + result.optimizeImage)
      }
    });
    this.setState({optimizeImage: optimizeImageNodes});
    let optimizeImageHelpDisplay = [];
    let optimizeImageHelpNodes = crawledLighthouse.map(result => {
      if (result.optimizeImageHelp.length > 0){
        optimizeImageHelpDisplay.push(result.optimizeImageHelp[0])
      }
      return (result)
    });
    this.setState({optimizeImageHelp: optimizeImageHelpDisplay[0]});
  //
  //   // ACCESSIBILITY! //
  //
  //   // image alts
  //   let imageAltNodes = crawledLighthouse.map(result => {
  //     if (result.imageAlt.length < 1) {
  //       return ("");
  //     } else {
  //       return (" " + result.url + ": " + result.imageAlt)
  //     }
  //   });
  //   this.setState({imageAlt: imageAltNodes});
  //   let imageAltHelpDisplay = [];
  //   let imageAltHelpNodes = crawledLighthouse.map(result => {
  //     if (result.imageAltHelp.length > 0){
  //       imageAltHelpDisplay.push(result.imageAltHelp[0])
  //     }
  //     return (result)
  //   });
  //   this.setState({imageAltHelp: imageAltHelpDisplay[0]});
  }

  render() {
    return (
      <div>
        <h2>Quality Assurance Tasks</h2>
        <h3>Performance Opportunities:</h3>
        <h4>{this.state.offscreenHelp}</h4>
        <p>{this.state.offscreenImages}</p>
        <h4>{this.state.renderSheetsHelp}</h4>
        <p>{this.state.renderSheets}</p>
        <h4>{this.state.renderScriptsHelp}</h4>
        <p>{this.state.renderScripts}</p>
        <h4>{this.state.imageSizeHelp}</h4>
        <p>{this.state.imageSize}</p>
        <h4>{this.state.optimizeImageHelp}</h4>
        <p>{this.state.optimizeImage}</p>
        <br/>
        {this.state.offscreenMap}
        {/* <h3>Accessibility Opportunities:</h3>
        <h4>{this.state.imageAltHelp}</h4>
        <p>{this.state.imageAlt}</p> */}
      </div>
    )
  }
}

export default LHCrawlDetail;
