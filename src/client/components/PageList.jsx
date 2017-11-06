import React, { Component } from "react";
import Page from './Page.jsx';

class PageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pageNodes = this.props.data.map(url => {
      return (
        <Page
          url={ url }
          key={ url }/>
      )
    });
    let formAreaContent;
    if (pageNodes.length === 0) {
      formAreaContent = ''
    } else {
      formAreaContent =
        <div>
          <h3>pages found from crawler:</h3>
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

export default PageList;
