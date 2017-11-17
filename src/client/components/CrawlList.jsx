import React, { Component } from "react";

class CrawlList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pageNodes = this.props.data.map(url => {
      return (
          <p key={url}>{url}</p>
      )
    });
    let formAreaContent;
    if (pageNodes.length === 0) {
      formAreaContent = ''
    } else {
      formAreaContent =
        <div>
          <h4>pages found from crawler:</h4>
          { pageNodes }
        </div>
    }
    return (
      <div>
        { formAreaContent }
      </div>
    )
  }
}

export default CrawlList;
