import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import LHCrawlDelete from './LHCrawlDelete.jsx';
var dateFormat = require('dateformat');

class LHCrawlDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      local: [],
      offscreenImages: '',
      offscreenHelp: '',
      renderSheets: '',
      renderSheetsHelp: '',
      renderScripts: '',
      renderScriptsHelp: ''
    };
    this.loadResultsFromServer = this.loadResultsFromServer.bind(this);
    this.handleLHCrawlDelete = this.handleLHCrawlDelete.bind(this);
  }

  loadResultsFromServer() {
    // makes axios Get request to save all data into state
    axios.get('http://localhost:3000/crawlLH')
    .then(res => {
      this.setState({ local: res.data });
    })
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

  }

  componentDidMount() {
    // loads all crawled lighthouse results from axios Get request when comp loads
    this.loadResultsFromServer();
    setInterval(this.loadResultsFromServer, 2000);
  }

  render() {
    return (
      <div>
        <h4>{this.state.offscreenHelp}</h4>
        <p>{this.state.offscreenImages}</p>
        <h4>{this.state.renderSheetsHelp}</h4>
        <p>{this.state.renderSheets}</p>
        <h4>{this.state.renderScriptsHelp}</h4>
        <p>{this.state.renderScripts}</p>
        <h4>{this.state.imageSizeHelp}</h4>
        <p>{this.state.imageSize}</p>
      </div>
    )
  }
}

export default LHCrawlDetail;
