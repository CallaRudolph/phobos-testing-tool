import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import LHCrawlDelete from './LHCrawlDelete.jsx';
import OffscreenImages from './Performance/OffscreenImages.jsx';
import RenderSheets from './Performance/RenderSheets.jsx';
import RenderScripts from './Performance/RenderScripts.jsx';
import ImageSize from './Performance/ImageSize.jsx';
import OptimizeImage from './Performance/OptimizeImage.jsx';

class LHCrawlDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offscreenImagesHelp: '',
      offscreenImages: '',
      renderSheetsHelp: '',
      renderSheets: '',
      renderScriptsHelp: '',
      renderScripts: '',
      imageSizeHelp: '',
      imageSize: '',
      optimizeImageHelp: '',
      optimizeImage: ''
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
    return (
      <div>
        <h2>Quality Assurance Tasks</h2>
        <h3>Performance Opportunities:</h3>
        <h4>{this.state.offscreenImagesHelp}</h4>
        {this.state.offscreenImages}
        <h4>{this.state.renderSheetsHelp}</h4>
        {this.state.renderSheets}
        <h4>{this.state.renderScriptsHelp}</h4>
        {this.state.renderScripts}
        <h4>{this.state.imageSizeHelp}</h4>
        {this.state.imageSize}
        <h4>{this.state.optimizeImageHelp}</h4>
        {this.state.optimizeImage}
      </div>
    )
  }
}

export default LHCrawlDetail;
