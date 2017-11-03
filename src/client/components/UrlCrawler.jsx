import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import { postUrl } from "./../../app/routes/url";
// import routes file to track changes in webpack

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
    .then(function(response) {
      console.log("done");
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
    this.setState({url: ''});
  }

  render() {
    return (
      <div>
        <h2>crawling.</h2>
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
