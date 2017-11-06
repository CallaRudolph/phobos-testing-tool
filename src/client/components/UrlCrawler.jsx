import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import CrawlList from "./CrawlList.jsx";
// import { postUrl } from "./../../app/routes/url";
// << import routes file to track changes in webpack

class UrlCrawler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      data: []
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var url = {'url': this.state.url};
    axios.post('/crawl', url)
    .then(function(response) {
      var crawlResponse = [];
      crawlResponse.push(response.data);
      this.setState({url: ''});
      this.setState({data: crawlResponse[0]});
    }.bind(this)) //need the bind for axios post response to affect state
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    var allCrawled = this.state.data;
    let crawlNodes = allCrawled.map(url => {
      return (url)
    });
    return (
      <div>
        <h2>enter a url to crawl:</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="enter a url" type="text" value={this.state.url} onChange={this.handleUrlChange} />
            <Button bsStyle="success"
            bsSize="xsmall" type="submit">crawl</Button>
        </form>
        <CrawlList
          data={ crawlNodes }/>
      </div>
    )
  }
}

export default UrlCrawler;
