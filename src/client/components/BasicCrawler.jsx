import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";

class BasicCrawler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      pending: false,
      data: [],
      showList: false
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showList = this.showList.bind(this);
    this.hideList = this.hideList.bind(this);
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    this.setState({pending: true}); // alters state for pending crawler message
    event.preventDefault();
    var url = {'url': this.state.url};
    axios.post('/basicCrawl', url)
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

  showList() {
    this.setState({
      showList: true
    });
  }

  hideList() {
    this.setState({
      showList: false
    });
  }

  render() {
    let crawlPending; // displays a pending message to let user know the crawler is running
    if (this.state.pending === false) {
      crawlPending = ''
    } else {
      crawlPending =
        <div>
          <p>the crawler is running, the list will show soon...</p>
        </div>
    }

    let crawlList;
    let data = this.state.data;
    if (this.state.showList === false && data.length === 0) {
      crawlList = ''
    } else if (this.state.showList === false && data.length > 0) {
      crawlList =
      <h4><a href='#/' onClick={ this.showList }>Show Crawl List</a></h4>
    } else {
      crawlList =
      <div>
        <h4><a href='#/' onClick={ this.hideList }>Hide Crawl List</a></h4>
        <ul>
          {data.map(function(url){
            return <li className="list-unstyled" key={url}>{url}</li>
            })}
        </ul>
      </div>
    }

    var button = {
      margin: "3px",
      marginTop: "2px"
    }

    return (
      <div>
        <h4>Enter a url to crawl:</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="https://" type="text" value={this.state.url} onChange={this.handleUrlChange} />
          <Button style={button} bsStyle="default"
            bsSize="xsmall" type="submit">Start Crawling</Button>
        </form>
        { crawlPending }
        { crawlList }
      </div>
    )
  }
}

export default BasicCrawler;
