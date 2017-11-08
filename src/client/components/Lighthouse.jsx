import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";

class Lighthouse extends Component {
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
    axios.post('/lighthouse', url)
    .then(function(response) {
      console.log(response);
      console.log("first meaningful paint: " + response.data.audits['first-meaningful-paint']['rawValue']);
      console.log("perceptual speed index: " + response.data.audits['speed-index-metric']['rawValue']);
      console.log("lighthouse score for performance: " + response.data.reportCategories[1].score);
      console.log("lighthouse score for best practices: " + response.data.reportCategories[3].score);
      console.log("lighthouse score for accessibility: " + response.data.reportCategories[2].score);
      // var crawlResponse = [];
      // crawlResponse.push(response.data);
      this.setState({url: ''});
      // this.setState({data: crawlResponse[0]});
    }.bind(this)) //need the bind for axios post response to affect state
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    // var crawledPages = this.state.data;
    // let pageNodes = crawledPages.map(url => {
    //   return (url)
    // });
    return (
      <div>
        <h3>Enter a url for lighthouse:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="https://" type="text" value={this.state.url} onChange={this.handleUrlChange} />
            <Button bsStyle="warning"
            bsSize="xsmall" type="submit">lighthouse it</Button>
        </form>
      </div>
    )
  }
}

export default Lighthouse;
