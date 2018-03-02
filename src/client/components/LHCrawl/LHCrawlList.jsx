import React, { Component } from "react";
import LHCrawlDetail from './LHCrawlDetail.jsx';

class CrawlList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childVisible: false
    };
  }

  onClick() {
    this.setState(prevState => ({ childVisible: !prevState.childVisible }));
  }

  render() {
    let formAreaContent;
    if (this.props.local === undefined) {
      formAreaContent = ''
    } else {
      formAreaContent =
      <div>
        <h5><a href='#/' onClick={() => this.onClick()}>
          lighthouse info for crawled urls
        </a></h5>
        { this.state.childVisible && <LHCrawlDetail
              local={this.props.local}/> }
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
