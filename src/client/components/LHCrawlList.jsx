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
    let crawledLighthouseNodes = this.props.local.map(result => {
      return (
        <LHCrawlDetail
          key={ result._id }
          id={ result._id }
          url={ result.url }
          createdAt={ result.createdAt }
          offscreenHelp={result.offscreenHelp}
          offscreenImages={ result.offscreenImages }/>
      )
    });

    // this is just the basic crawl list w/o lighthouse results
    // let pageNodes = this.props.data.map(url => {
    //   return (
    //       <p key={url}>{url}</p>
    //   )
    // });

    let formAreaContent;
    if (crawledLighthouseNodes.length === 0) {
      formAreaContent = ''
    } else if (this.state.listShowing === false) {
      formAreaContent =
        <div>
          <h4><a href='#/' onClick={ this.viewCrawlList }>detailed lighthouse info for crawled urls</a></h4>
        </div>
    } else {
        formAreaContent =
          <div>
            <h4><a href='#/' onClick={ this.hideCrawlList }>hide list</a></h4>
            {/* { pageNodes } */}
            { crawledLighthouseNodes }
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
