import React, { Component } from "react";
import PerformanceDetail from "./PerformanceDetail.jsx";
import AccessibilityDetail from "./AccessibilityDetail.jsx";

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

    let bestPractices = reports[3].name;
    let bpDescription = reports[3].description;

    // formAreaContent for render return value based on boolean
    let formAreaContent;
    if (this.state.detailShowing === false) {
      formAreaContent =
        <a href='#/' onClick={ this.viewPageDetails }>show details for {url}</a>
    } else {
      // best practices setup
      let bestPracticesAudit = reports[3].audits;
      let bestPracticesFails = [];
      for (var i = 0; i < bestPracticesAudit.length; i++) {
        if (bestPracticesAudit[i].score === 0) {
          var bestPracticesFailDescript = bestPracticesAudit[i].result.description;
          var bestPracticesFailHelp = bestPracticesAudit[i].result.helpText;
          bestPracticesFails.push(bestPracticesFailDescript + ": " + bestPracticesFailHelp);
        }
      }
      let bestPracticesFailNodes = bestPracticesFails.map(bestPracticeFail => {
        return (<p key={bestPracticeFail}>- {bestPracticeFail}</p>);
      });

      formAreaContent =
        <div>
          <a href='#/' onClick={ this.hidePageDetails }>hide details for {url}</a>

          <PerformanceDetail
            data={this.props.data}/>

          <AccessibilityDetail
            data={this.props.data}/>

          <h4>{bestPractices}</h4>
          <h6>{bpDescription}</h6>
          <h5>{bestPracticesFailNodes.length} failed audits</h5>
          {bestPracticesFailNodes}
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
