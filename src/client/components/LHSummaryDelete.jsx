import React, { Component } from "react";

class LHSummaryDelete extends Component {
  constructor(props) {
    super(props);
    this.deleteLighthouse = this.deleteLighthouse.bind(this);
  }

  deleteLighthouse(e) {
    e.preventDefault();
    let id = this.props.id;
    // sends delete request to parent CrawlLHSummary component
    this.props.onLighthouseDelete(id);
  }

  render() {
    return (
      <div>
        <a href='#' onClick={ this.deleteLighthouse }>delete summary</a>
      </div>
    )
  }
}

export default LHSummaryDelete;
