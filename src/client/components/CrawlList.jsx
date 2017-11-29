import React, { Component } from "react";

class CrawlList extends Component {
  constructor(props) {
    super(props);
    this.viewCrawlList = this.viewCrawlList.bind(this);
    this.hideCrawlList = this.hideCrawlList.bind(this);
    this.state = {
      listShowing: false
    };
  }

  // toggle for crawl list view w/ boolean state
  viewCrawlList() {
    this.setState({
      listShowing: true
    });
  }

  hideCrawlList() {
    this.setState({
      listShowing: false
    });
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
    } else if (this.state.listShowing === false) {
      formAreaContent =
        <div>
          <h5><a href='#/' onClick={ this.viewCrawlList }>click for list of pages found from crawler</a></h5>
        </div>
    } else {
        formAreaContent =
          <div>
            <h4><a href='#/' onClick={ this.hideCrawlList }>list of pages found from crawler:</a></h4>
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
