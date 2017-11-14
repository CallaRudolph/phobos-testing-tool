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

    let progressiveWebApp = reports[0].name;
    let pwaDescription = reports[0].description;
    let manualPWAnotes = data.reportGroups['manual-pwa-checks']['description'];

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
      // do we want to show passing audits?
      // do we want this info in sub components?

      // progressive web app setup
      let pwaAudit = reports[0].audits;
      let pwaCheck = [];
      let pwaFail = [];
      for (var i = 0; i < pwaAudit.length; i++) {
        if (pwaAudit[i].score === 0 && pwaAudit[i].weight === 0) {
          var pwaCheckDescript = pwaAudit[i].result.description;
          var pwaCheckHelp = pwaAudit[i].result.helpText;
          pwaCheck.push(pwaCheckDescript + ": " + pwaCheckHelp);
        } else if (pwaAudit[i].score === 0 && pwaAudit[i].weight === 1) {
          var pwaFailDescript = pwaAudit[i].result.description;
          var pwaFailHelp = pwaAudit[i].result.helpText;
          pwaFail.push(pwaFailDescript + ": " + pwaFailHelp);
        }
      }
      let pwaCheckNodes = pwaCheck.map(pwaCheck => {
        return (<p key={pwaCheck}>- {pwaCheck}</p>);
      });
      let pwaFailNodes = pwaFail.map(pwaFail => {
        return (<p key={pwaFail}>- {pwaFail}</p>);
      });

      // performance setup
      let perfAudit = reports[1].audits;
      // so much can be mapped out here! what to display? should we check diagnostics as well? passed audits?
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
      // display passing audits?
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

      formAreaContent =
        <div>
          <a href='#' onClick={ this.hidePageDetails }>hide details for {url}</a>

          <h4>{progressiveWebApp}</h4>
          <h6>{pwaDescription}</h6>
          <h5>{pwaFailNodes.length} failed audits</h5>
          {pwaFailNodes}
          <h5>Manual checks to verify</h5>
          <p>{manualPWAnotes}</p>
          {pwaCheckNodes}

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
          <p>map through audit result scores and show false (fails)</p>
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
