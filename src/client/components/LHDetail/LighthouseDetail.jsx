import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import PageList from "./PageList.jsx";

class LighthouseDetail extends Component {
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
          <p>Lighthouse is running, results will show soon...</p>
        </div>
    }

    var button = {
      margin: "3px",
      marginTop: "2px"
    }

    return (
      <div>
        <h4>Enter a url for detailed lighthouse results:</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            size="28"
            placeholder="https://" type="text" value={this.state.url} onChange={this.handleUrlChange} />
          <Button style={button} bsStyle="warning"
            bsSize="xsmall" type="submit">
            Start Testing
          </Button>
        </form>
        { lighthousePending }
        <PageList
          data={ this.state.data }/>
      </div>
    )
  }
}

export default LighthouseDetail;
