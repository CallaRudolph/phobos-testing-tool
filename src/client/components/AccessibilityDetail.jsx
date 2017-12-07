import React, { Component } from "react";

class AccessibilityDetail extends Component {
  constructor(props) {
    super(props);
    this.viewPassedAudits = this.viewPassedAudits.bind(this);
    this.hidePassedAudits = this.hidePassedAudits.bind(this);
    this.state = {
      passedAuditsShowing: false
    }
  }

  // toggle for detail views w/ boolean state
  viewPassedAudits() {
    this.setState({
      passedAuditsShowing: true
    });
  }

  hidePassedAudits() {
    this.setState({
      passedAuditsShowing: false
    });
  }

  render() {
    let data = this.props.data;
    let reports = data.reportCategories;
    let audits = data.audits;

    let accessibility = reports[2].name;
    let accDescription = reports[2].description.replace('[', '').replace('](', ' - ').replace(').', '');
    let accessAudit = reports[2].audits;

    // finds all failed audits for accessibility
    let accessFails = [];
    for (var i = 0; i < accessAudit.length; i++) {
      if (accessAudit[i].score === 0) {
        var accessFailDescript = accessAudit[i].result.description;
        var accessFailHelp = accessAudit[i].result.helpText.replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');
        accessFails.push(accessFailDescript + " " + accessFailHelp);
      }
    }
    // maps out all failed audits to split them up
    let accessFailNodes = accessFails.map(accessFail => {
      return (<div key={accessFail} className="well well-sm"><p>- {accessFail}</p></div>);
    });

    // finds all passed audits for accessibility
    let passedAudits = [];
    for (var i = 0; i < accessAudit.length; i++) {
      if (accessAudit[i].score === 100) {
        var accessPassDescript = accessAudit[i].result.description.replace('`[', '').replace(']`', '');
        var accessPassHelp = accessAudit[i].result.helpText.replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');
        passedAudits.push(accessPassDescript + " " + accessPassHelp);
      }
    }
    // maps out all passed audits to split them up
    let accessibilityPassNodes = passedAudits.map(passedAudit => {
      return (<div key={passedAudit}><p>- {passedAudit}</p></div>);
    });

    // options for passing audit display
    let passedAuditsDisplay;
    if (this.state.passedAuditsShowing === false) {
      passedAuditsDisplay =
      <div className="well well-sm">
        <h5>{passedAudits.length} <a href='#/' onClick={ this.viewPassedAudits }>Passed Audits</a></h5>
      </div>
    } else {
      passedAuditsDisplay =
      <div className="well well-sm">
        <h5>{passedAudits.length} <a href='#/' onClick={ this.hidePassedAudits }>Passed Audits</a></h5>
        {accessibilityPassNodes}
      </div>
    }

    return (
      <div>
        <h4>{accessibility}</h4>
        <h6>{accDescription}</h6>
        {accessFailNodes}
        {passedAuditsDisplay}
      </div>
    )
  }
}

export default AccessibilityDetail;
