import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import LHCrawlList from "./LHCrawlList.jsx";

class LHCrawl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      pending: false,
      data: [],
      local: []
    };
    this.loadResultsFromServer = this.loadResultsFromServer.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadResultsFromServer() {
    // makes axios Get request to save all data into state
    axios.get('http://localhost:3000/crawlLH')
    .then(res => {
      this.setState({ local: res.data });
    })
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    this.setState({pending: true}); // alters state for pending crawler message
    event.preventDefault();
    var url = {'url': this.state.url};
    axios.post('/crawl', url)
    .then(function(response) {
      var crawlResponse = [];
      crawlResponse.push(response.data);
      this.setState({url: ''});
      this.setState({data: crawlResponse[0]});
      this.setState({pending: false}); // this goes away too soon.
    }.bind(this)) //need the bind for axios post response to affect state
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount() {
    // loads all crawled lighthouse results from axios Get request when comp loads
    this.loadResultsFromServer();
    setInterval(this.loadResultsFromServer, 2000);
  }

  render() {
    // to display crawled lighthouse results
    let crawledLHNodesDisplay;
    let crawledLHNodes = this.state.local.map(result => {
      return (result)
    });
    crawledLHNodesDisplay =
      <LHCrawlList
        local={ crawledLHNodes }
      />

    // displays a pending message to let user know the crawler is running
    let crawlPending =
      <div>
        <p>the crawler is running, results will show soon...</p>
      </div>

    // message if crawler can't find anything
    let noCrawl =
      <div>
        <p>{this.state.data}</p>
      </div>

    var button = {
      margin: "3px",
      marginTop: "2px"
    }

    return (
      <div>
        <h5>Enter a url to crawl and run results through lighthouse:</h5>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="https://"
            type="text"
            value={this.state.url}
            onChange={this.handleUrlChange} />
          <Button
            style={button}
            bsStyle="info"
            bsSize="small"
            type="submit">
            Start Crawling
          </Button>
        </form>
        { this.state.pending && crawlPending }
        { this.state.data.length <= 1 && noCrawl }
        { crawledLHNodesDisplay }
      </div>
    )
  }
}

export default LHCrawl;
