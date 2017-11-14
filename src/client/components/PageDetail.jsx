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
    let performance = reports[1].name;
    let perfDescription = reports[1].description;
    let firstPaint = audits['first-meaningful-paint']['displayValue'];
    let speedScore = audits['speed-index-metric']['score'];
    let optimalSpeed = audits['speed-index-metric']['optimalValue'];
    let accessibility = reports[2].name;
    let accDescription = reports[2].description;
    let bestPractices = reports[3].name;
    let bpDescription = reports[3].description;
    let manualPWAcheck = data.reportGroups['manual-pwa-checks']['description'];

    // formAreaContent for render return value based on boolean
    let formAreaContent;
    if (this.state.detailShowing === false) {
      formAreaContent =
        <a href='#' onClick={ this.viewPageDetails }>show details for {url}</a>
    } else {

      // need to differentiate b/w manual checks and actual failed audits.
      // do we want to show passing audits?
      // do we want this info in sub components?
      let pwaAudit = reports[0].audits;
      let pwaCheck = [];
      console.log(pwaAudit);
      for (var i = 0; i < pwaAudit.length; i++) {
        if (pwaAudit[i].score === 0 && pwaAudit[i].group === "manual-pwa-checks") {
          var pwaCheckDescript = pwaAudit[i].result.description;
          var pwaCheckHelp = pwaAudit[i].result.helpText;
          pwaCheck.push(pwaCheckDescript + ": " + pwaCheckHelp);
        }
      }
      console.log(pwaCheck);
      let pwaCheckNodes = pwaCheck.map(pwaCheck => {
        return (<p key={pwaCheck}>- {pwaCheck}</p>);
      })
      console.log(pwaCheckNodes);

      formAreaContent =
        <div>
          <a href='#' onClick={ this.hidePageDetails }>hide details for {url}</a>

          <h4>{progressiveWebApp}</h4>
          <h6>{pwaDescription}</h6>
        <p>Manual checks to verify ({pwaCheckNodes.length}):</p>
          <p>{manualPWAcheck}</p>
        {pwaCheckNodes}

          <h4>{performance}</h4>
          <h6>{perfDescription}</h6>
          <p>First meaningful paint {firstPaint}</p>
          <p>Perceptual Speed Index: {speedScore} (target: {optimalSpeed})</p>
          <p>opportunities vs. diagnostics: map through audit result scores and show false (fails) vs. diagnostics</p>

          <h4>{accessibility}</h4>
          <h6>{accDescription}</h6>
          <p>map through audit result scores and show false (fails)</p>

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
