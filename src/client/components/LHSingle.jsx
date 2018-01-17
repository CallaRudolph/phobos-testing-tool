import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";

class LighthouseSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      pending: false,
      data: []
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    this.setState({pending: true}); // alters state for pending lighthouse message
    event.preventDefault();
    var url = {'url': this.state.url};
    axios.post('/lighthouse', url)
    .then(function(response) {
      console.log(response);
      this.setState({url: ''});
      this.setState({data: response});
      this.setState({pending: false});
    }.bind(this)) //need the bind for axios post response to affect state
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    let lighthousePending; // displays a pending message to let user know the crawler is running
    if (this.state.pending === false) {
      lighthousePending = ''
    } else {
      lighthousePending =
        <div>
          <p>Lighthouse is running on a single url, results will show soon...</p>
        </div>
    }

    let data = this.state.data.data;

    let lighthouseFinished; // displays lighthouse results
    if (this.state.data.length === undefined) {

      // performance opportunities
      let perfOpp = data.reportCategories[1].audits;

      // offscreen images
      let offscreenDisplay = [];
      for (var i = 0; i < perfOpp.length; i++) {
        if(perfOpp[i].id === "offscreen-images" && perfOpp[i].score < 100) {
          var offscreenHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
          var offscreenItems = perfOpp[i].result.details.items;
          var offscreenArray = [];
          if (offscreenItems.length > 0) {
            for (var j = 0; j < offscreenItems.length; j++) {
              var item = offscreenItems[j][1].text;
              var size = offscreenItems[j][2].text;
              offscreenArray.push(" " + item + " size: " + size);
            }
          }
          offscreenDisplay.push(offscreenHelp + " Details: " + offscreenArray);
        }
      }

      // render-blocking stylesheets
      let renderSheetsDisplay = [];
      for (var i = 0; i < perfOpp.length; i++) {
        if(perfOpp[i].id === "link-blocking-first-paint" && perfOpp[i].score < 100) {
          var renderSheetsHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
          var renderSheetsItems = perfOpp[i].result.details.items;
          var renderSheetsArray = [];
          if (renderSheetsItems.length > 0) {
            for (var j = 0; j < renderSheetsItems.length; j++) {
              var item = renderSheetsItems[j][0].text;
              var size = renderSheetsItems[j][1].text;
              renderSheetsArray.push(" " + item + " size: " + size);
            }
          }
          renderSheetsDisplay.push(renderSheetsHelp + " Details: " + renderSheetsArray);
        }
      }

      // render-blocking scripts
      let renderScriptsDisplay = [];
      for (var i = 0; i < perfOpp.length; i++) {
        if(perfOpp[i].id === "script-blocking-first-paint" && perfOpp[i].score < 100) {
          var renderScriptsHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
          var renderScriptsItems = perfOpp[i].result.details.items;
          var renderScriptsArray = [];
          if (renderScriptsItems.length > 0) {
            for (var j = 0; j < renderScriptsItems.length; j++) {
              var item = renderScriptsItems[j][0].text;
              var size = renderScriptsItems[j][1].text;
              renderScriptsArray.push(" " + item + " size: " + size);
            }
          }
          renderScriptsDisplay.push(renderScriptsHelp + " Details: " + renderScriptsArray);
        }
      }

      // properly size images
      let imageSizeDisplay = [];
      for (var i = 0; i < perfOpp.length; i++) {
        if(perfOpp[i].id === "uses-responsive-images" && perfOpp[i].score < 100) {
          var imageSizeHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
          var imageSizeItems = perfOpp[i].result.details.items;
          var imageSizeArray = [];
          if (imageSizeItems.length > 0) {
            for (var j = 0; j < imageSizeItems.length; j++) {
              var item = imageSizeItems[j][1].text;
              var size = imageSizeItems[j][2].text;
              imageSizeArray.push(" " + item + " size: " + size);
            }
          }
          imageSizeDisplay.push(imageSizeHelp + " Details: " + imageSizeArray);
        }
      }

      // optimize images
      let optimizeImageDisplay = [];
      for (var i = 0; i < perfOpp.length; i++) {
        if(perfOpp[i].id === "uses-optimized-images" && perfOpp[i].score < 100) {
          var optimizeImageHelp = perfOpp[i].result.helpText.replace(/Learn More/i, 'Learn more: ').replace('[', '').replace('](', '').replace(').', '');
          var optimizeImageItems = perfOpp[i].result.details.items;
          var optimizeImageArray = [];
          if (optimizeImageItems.length > 0) {
            for (var j = 0; j < optimizeImageItems.length; j++) {
              var item = optimizeImageItems[j][1].text;
              var size = optimizeImageItems[j][2].text;
              optimizeImageArray.push(" " + item + " size: " + size);
            }
          }
          optimizeImageDisplay.push(optimizeImageHelp + " Details: " + optimizeImageArray);
        }
      }

      lighthouseFinished =
        <div>
          <h3>{data.initialUrl}</h3>
          <p>{this.state.data.headers.date}</p>
          <h4>Performance Opportunities:</h4>
          <h5>{data.reportGroups['perf-hint']['description']}</h5>
          <p>{offscreenDisplay}</p>
          <p>{renderSheetsDisplay}</p>
          <p>{renderScriptsDisplay}</p>
          <p>{imageSizeDisplay}</p>
          <p>{optimizeImageDisplay}</p>
        </div>
    } else {
      lighthouseFinished = ''
    }

    return (
      <div>
        <h4>Enter a url to check lighthouse results without crawling:</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            size="28"
            placeholder="enter a url - - https://" type="text" value={this.state.url} onChange={this.handleUrlChange} />
          <Button bsStyle="danger"
            bsSize="xsmall" type="submit">
            Start Testing
          </Button>
        </form>
        { lighthousePending }
        { lighthouseFinished }
      </div>
    )
  }
}

export default LighthouseSingle;
