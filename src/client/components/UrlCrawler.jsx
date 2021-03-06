import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import CrawlList from "./CrawlList.jsx";

class UrlCrawler extends Component {
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
    // CHANGE BACK to http://localhost:3000/results during development!
    // CHANGE BACK to https://phobos-testing-tool.herokuapp.com/results for heroku
    axios.get('http://localhost:3000/results')
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
      this.setState({pending: false});
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
    var crawledLighthouse = this.state.local;
    let crawledLighthouseNodes = crawledLighthouse.map(result => {
      return (result)
    });

    // this is just a basic crawl list w/ no lighthouse results
    var crawledPages = this.state.data;
    let pageNodes = crawledPages.map(url => {
      return (url)
    });

    let crawlPending; // displays a pending message to let user know the crawler is running
    if (this.state.pending === false) {
      crawlPending = ''
    } else {
      crawlPending =
        <div>
          <p>the crawler is running, results will show soon...</p>
        </div>
    }

    var inputSpace = {
      marginRight: "5px"
    }

    return (
      <div>
        <h4>Enter a url to crawl and send results to lighthouse:</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            style={inputSpace} placeholder="https://" type="text" value={this.state.url} onChange={this.handleUrlChange} />
            <Button bsStyle="success"
            bsSize="xsmall" type="submit">Start Crawling</Button>
        </form>
        { crawlPending }
        <CrawlList
          local={ crawledLighthouseNodes }
          // data={ pageNodes }
        />
      </div>
    )
  }
}

export default UrlCrawler;
