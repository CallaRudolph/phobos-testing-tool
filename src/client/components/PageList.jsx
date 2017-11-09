import React, { Component } from "react";
import Page from './Page.jsx';

class PageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let formAreaContent;
    if (this.props.data.length === 0) {
      formAreaContent = ''
    } else {
      formAreaContent =
        <div>
          <Page
          data={this.props.data}/>
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
