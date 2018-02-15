import React, { Component } from "react";
import LHCrawlDetail from './LHCrawlDetail.jsx';

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
    // this is just the basic crawl list w/o lighthouse results
    // let pageNodes = this.props.data.map(url => {
    //   return (
    //       <p key={url}>{url}</p>
    //   )
    // });

    let formAreaContent;
    let crawledLHNodes = this.props.local;
    if (crawledLHNodes === undefined) {
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
            {/* { pageNodes } */}
            <LHCrawlDetail
            local={this.props.local}/>
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
