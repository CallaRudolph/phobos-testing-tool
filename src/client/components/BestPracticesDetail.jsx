import React, { Component } from "react";

class BestPracticesDetail extends Component {
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

    let bestPractices = reports[3].name;
    let bpDescription = reports[3].description;
    let bestPracticesAudit = reports[3].audits;

    // finds all failed audits for best practices
    let bestPracticesFails = [];
    for (var i = 0; i < bestPracticesAudit.length; i++) {
      if (bestPracticesAudit[i].score === 0) {
        var bestPracticesFailDescript = bestPracticesAudit[i].result.description;
        var bestPracticesFailHelp = bestPracticesAudit[i].result.helpText.replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');
        // finds specific line items for the failures
        var failItemsLoop = bestPracticesAudit[i].result.details.items;
        var failItems = [];
        if (failItemsLoop.length > 0) {
          var failedItemsArray = [];
          for (var j = 0; j < failItemsLoop.length; j++) {
            var item = failItemsLoop[j];
            var itemArray = [];
            for (var k = 0; k < item.length; k++) {
              itemArray.push(item[k].text);
            }
            failItems.push(itemArray);
          }
        }
        var failItemsMerge = failItems[0];
        let failItemsDisplay;
        // ensures no empty line items are joined
        if (failItemsMerge !== undefined) {
          failItemsDisplay = failItemsMerge.join(", ");
        }
        // some failed audits don't show line items, this decides what to display for the failed audit
        if (failItemsDisplay === undefined) {
          bestPracticesFails.push(bestPracticesFailDescript + ": " + bestPracticesFailHelp);
        } else {
          bestPracticesFails.push(bestPracticesFailDescript + ": " + bestPracticesFailHelp + " --> the issue can be found at " + failItemsDisplay);
        }

      }
    }
    // maps out all failed audits to split them up
    let bestPracticesFailNodes = bestPracticesFails.map(bestPracticeFail => {
      return (<div key={bestPracticeFail} className="well well-sm"><p>- {bestPracticeFail}</p></div>);
    });

    // finds all passed audits for best practices
    let passedAudits = [];
    for (var i = 0; i < bestPracticesAudit.length; i++) {
      if (bestPracticesAudit[i].score === 100) {
        var bestPracticesPassDescript = bestPracticesAudit[i].result.description;
        var bestPracticesPassHelp = bestPracticesAudit[i].result.helpText.replace(/Learn More/i, '').replace('[', '').replace('](', '').replace(').', '').replace(')', '');
        passedAudits.push(bestPracticesPassDescript + ": " + bestPracticesPassHelp);
      }
    }
    // maps out all passed audits to split them up
    let bestPracticesPassNodes = passedAudits.map(passedAudit => {
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
        {bestPracticesPassNodes}
      </div>
    }

    return (
      <div>
        <h4>{bestPractices}</h4>
        <h6>{bpDescription}</h6>
        <h5>{bestPracticesFailNodes.length} failed audits</h5>
        {bestPracticesFailNodes}
        {passedAuditsDisplay}
      </div>
    )
  }
}

export default BestPracticesDetail;
