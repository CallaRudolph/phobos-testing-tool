import React, { Component } from "react";
import LHCrawlDetail from './LHCrawlDetail.jsx';

class CrawlList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listShowing: false,
      local: this.props.local
    };
    this.viewCrawlList = this.viewCrawlList.bind(this);
    this.hideCrawlList = this.hideCrawlList.bind(this);
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
    let formAreaContent;
    if (this.state.local === undefined) {
      formAreaContent = ''
    } else if (this.state.listShowing === false) {
      formAreaContent =
        <div>
          <h5><a href='#/' onClick={ this.viewCrawlList }>detailed lighthouse info for crawled urls</a></h5>
        </div>
    } else {
        formAreaContent =
          <div>
            <h5><a href='#/' onClick={ this.hideCrawlList }>hide list</a></h5>
            <LHCrawlDetail
            local={this.state.local}/>
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
