import React, { Component } from "react";
import Crawl from './Crawl.jsx';

class CrawlList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let crawlNodes = this.props.data.map(url => {
      return (
        <Crawl
          url={ url }
          key={ url }/>
      )
    });
    let formAreaContent;
    if (crawlNodes.length === 0) {
      formAreaContent = ''
    } else {
      formAreaContent =
        <div>
          <h3>crawl response:</h3>
          { crawlNodes }
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
