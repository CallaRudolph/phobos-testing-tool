import React, { Component } from "react";

class Crawl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.url}</p>
      </div>
    )
  }
}

export default Crawl;
