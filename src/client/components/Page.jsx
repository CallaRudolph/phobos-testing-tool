import React, { Component } from "react";

class Page extends Component {
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

export default Page;
