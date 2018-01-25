import React, { Component } from "react";

class LHCrawlDelete extends Component {
  constructor(props) {
    super(props);
    this.deleteLHCrawl = this.deleteLHCrawl.bind(this);
  }

  deleteLHCrawl(e) {
    e.preventDefault();
    let id = this.props.id;
    // sends delete request to parent LHCrawlDetail component
    this.props.onLHCrawlDelete(id);
  }

  render() {
    return (
      <div>
        <a href='#' onClick={ this.deleteLHCrawl }>delete</a>
      </div>
    )
  }
}

export default LHCrawlDelete;
