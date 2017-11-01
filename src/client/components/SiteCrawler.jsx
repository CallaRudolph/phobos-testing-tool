import React, { Component } from "react";
var Crawler = require("simplecrawler");

class SiteCrawler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site: ''
    };
    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSiteChange(event) {
    this.setState({site: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var site = this.state.site;
    console.log(site);
    var crawler = Crawler(site)
      .on("fetchcomplete", function () {
          console.log("Fetched a resource!")
      });
    console.log(crawler);
  }

  render() {
    return (
      <div>
        <h2>crawling</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="enter a site" type="text" value={this.state.site} onChange={this.handleSiteChange} />
          <button type="submit">crawl</button>
        </form>
      </div>
    )
  }
}

export default SiteCrawler;
