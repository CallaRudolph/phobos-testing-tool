import React, { Component } from "react";

class BestPracticesDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    let reports = data.reportCategories;
    let audits = data.audits;

    let bestPractices = reports[3].name;
    let bpDescription = reports[3].description;

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
      return (<div key={bestPracticeFail} className="well well-sm"><p>- {bestPracticeFail}</p></div>);
    });

    return (
      <div>
        <h4>{bestPractices}</h4>
        <h6>{bpDescription}</h6>
        <h5>{bestPracticesFailNodes.length} failed audits</h5>
        {bestPracticesFailNodes}
      </div>
    )
  }
}

export default BestPracticesDetail;
