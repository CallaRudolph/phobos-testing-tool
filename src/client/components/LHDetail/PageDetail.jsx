import React, { Component } from "react";
import PerformanceDetail from "./PerformanceDetail.jsx";
import AccessibilityDetail from "./AccessibilityDetail.jsx";
import BestPracticesDetail from "./BestPracticesDetail.jsx";

class PageDetail extends Component {
  constructor(props) {
    super(props);
    this.viewPageDetails = this.viewPageDetails.bind(this);
    this.hidePageDetails = this.hidePageDetails.bind(this);
    this.state = {
      detailShowing: false
    };
  }

  // toggle for detail view w/ boolean state
  viewPageDetails() {
    this.setState({
      detailShowing: true
    });
  }

  hidePageDetails() {
    this.setState({
      detailShowing: false
    });
  }

  render() {
    let data = this.props.data;
    let url = data.initialUrl;
    let reports = data.reportCategories;
    let audits = data.audits;

    // formAreaContent for render return value based on boolean
    let formAreaContent;
    if (this.state.detailShowing === false) {
      formAreaContent =
        <a href='#/' onClick={ this.viewPageDetails }>show details for {url}</a>
    } else {
      formAreaContent =
        <div>
          <a href='#/' onClick={ this.hidePageDetails }>hide details for {url}</a>

          <PerformanceDetail
            data={this.props.data}/>

          <AccessibilityDetail
            data={this.props.data}/>

          <BestPracticesDetail
            data={this.props.data}/>
        </div>
    }

    return (
      <div>
        {formAreaContent}
      </div>
    )
  }
}

export default PageDetail;
