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
      data: []
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  render() {
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

    return (
      <div>
        <h3>Enter a url to crawl:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="https://" type="text" value={this.state.url} onChange={this.handleUrlChange} />
            <Button bsStyle="success"
            bsSize="xsmall" type="submit">crawl</Button>
        </form>
        { crawlPending }
        <CrawlList
          data={ pageNodes }/>
      </div>
    )
  }
}

export default UrlCrawler;
