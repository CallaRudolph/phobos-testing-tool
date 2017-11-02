import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";

class UrlCrawler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
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
    .catch(err => {
      console.error(err);
    });
    this.state.url = '';
  }

  render() {
    return (
      <div>
        <h2>crawling</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="enter a url" type="text" value={this.state.url} onChange={this.handleUrlChange} />
            <Button bsStyle="success"
            bsSize="xsmall" type="submit">crawl</Button>
        </form>
      </div>
    )
  }
}

export default UrlCrawler;
