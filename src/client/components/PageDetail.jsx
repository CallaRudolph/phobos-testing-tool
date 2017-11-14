import React, { Component } from "react";

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

    let performance = reports[1].name;
    let perfDescription = reports[1].description;
    let firstPaint = audits['first-meaningful-paint']['displayValue'];
    let firstPaintOptimal = audits['first-meaningful-paint']['optimalValue'];
    let firstPaintDescript = audits['first-meaningful-paint']['helpText'];
    let firstInteractive = audits['consistently-interactive']['displayValue'];
    let firstInteractiveDescript = audits['consistently-interactive']['helpText'];
    let consistentlyInteractive = audits['first-interactive']['displayValue'];
    let consistentlyInteractiveDescript = audits['first-interactive']['helpText'];
    let speedScore = audits['speed-index-metric']['displayValue'];
    let optimalSpeed = audits['speed-index-metric']['optimalValue'];
    let speedScoreDescript = audits['speed-index-metric']['helpText'];
    let inputLatency = audits['estimated-input-latency']['displayValue'];
    let inputLatencyOptimal = audits['estimated-input-latency']['optimalValue'];
    let inputLatencyDescript = audits['estimated-input-latency']['helpText'];
    let perfOpportunitiesDescript = data.reportGroups['perf-hint']['description'];

    let accessibility = reports[2].name;
    let accDescription = reports[2].description;

    let bestPractices = reports[3].name;
    let bpDescription = reports[3].description;

    // formAreaContent for render return value based on boolean
    let formAreaContent;
    if (this.state.detailShowing === false) {
      formAreaContent =
        <a href='#' onClick={ this.viewPageDetails }>show details for {url}</a>
    } else {
      // performance setup
      let perfAudit = reports[1].audits;
      let perfOpportunities = [];
      for (var i = 0; i < perfAudit.length; i++) {
        if (perfAudit[i].group === "perf-hint" && perfAudit[i].score < 100) {
          var perfOpportunityDescript = perfAudit[i].result.description;
          var perfOpportunityHelp = perfAudit[i].result.helpText;
          perfOpportunities.push(perfOpportunityDescript + ": " + perfOpportunityHelp);
        }
      }
      let perfOpportunityNodes = perfOpportunities.map(perfOpportunity => {
        return (<p key={perfOpportunity}>- {perfOpportunity}</p>);
      });

      // accessibility setup
      let accessAudit = reports[2].audits;
      let accessFails = [];
      for (var i = 0; i < accessAudit.length; i++) {
        if (accessAudit[i].score === 0) {
          var accessFailDescript = accessAudit[i].result.description;
          var accessFailHelp = accessAudit[i].result.helpText;
          accessFails.push(accessFailDescript + ": " + accessFailHelp);
        }
      }
      let accessFailNodes = accessFails.map(accessFail => {
        return (<p key={accessFail}>- {accessFail}</p>);
      });

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
          <a href='#' onClick={ this.hidePageDetails }>hide details for {url}</a>

          <h4>{performance}</h4>
          <h6>{perfDescription}</h6>
          <p>First meaningful paint: {firstPaint} (target: {firstPaintOptimal})</p>
          <p>{firstPaintDescript}</p>
          <p>First Interactive (beta): {firstInteractive}</p>
          <p>{firstInteractiveDescript}</p>
          <p>Consistently Interactive (beta): {consistentlyInteractive}</p>
          <p>{consistentlyInteractiveDescript}</p>
          <p>Perceptual Speed Index: {speedScore} (target: {optimalSpeed})</p>
          <p>{speedScoreDescript}</p>
          <p>Estimated Input Latency: {inputLatency} (target: {inputLatencyOptimal})</p>
          <p>{inputLatencyDescript}</p>
          <h5>Opportunities</h5>
          <h6>{perfOpportunitiesDescript}</h6>
          {perfOpportunityNodes}

          <h4>{accessibility}</h4>
          <h6>{accDescription}</h6>
          {accessFailNodes}

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
