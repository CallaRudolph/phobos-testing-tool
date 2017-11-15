import React, { Component } from "react";

class AccessibilityDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data;
    let reports = data.reportCategories;
    let audits = data.audits;

    let accessibility = reports[2].name;
    let accDescription = reports[2].description;

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
      return (<div key={accessFail} className="well well-sm"><p>- {accessFail}</p></div>);
    });

    return (
      <div>
        <h4>{accessibility}</h4>
        <h6>{accDescription}</h6>
        {accessFailNodes}
      </div>
    )
  }
}

export default AccessibilityDetail;
