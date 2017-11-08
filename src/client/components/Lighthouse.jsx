import React, { Component } from "react";
import axios from 'axios';
import { Button } from "react-bootstrap";
import PageList from "./PageList.jsx";

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
      this.setState({url: ''});
      this.setState({data: response.data});
    }.bind(this)) //need the bind for axios post response to affect state
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <h3>Enter a url for lighthouse:</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="https://" type="text" value={this.state.url} onChange={this.handleUrlChange} />
            <Button bsStyle="warning"
            bsSize="xsmall" type="submit">lighthouse it</Button>
        </form>
        <PageList
          data={ this.state.data }/>
      </div>
    )
  }
}

export default Lighthouse;
