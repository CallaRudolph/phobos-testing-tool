import React, { Component } from "react";

class PerformanceDetail extends Component {
  constructor(props) {
    super(props);
    this.viewPaintDetail = this.viewPaintDetail.bind(this);
    this.hidePaintDetail = this.hidePaintDetail.bind(this);
    this.viewFirstInteractiveDetail = this.viewFirstInteractiveDetail.bind(this);
    this.hideFirstInteractiveDetail = this.hideFirstInteractiveDetail.bind(this);
    this.viewConsistentlyInteractiveDetail = this.viewConsistentlyInteractiveDetail.bind(this);
    this.hideConsistentlyInteractiveDetail = this.hideConsistentlyInteractiveDetail.bind(this);
    this.viewSpeedIndexDetail = this.viewSpeedIndexDetail.bind(this);
    this.hideSpeedIndexDetail = this.hideSpeedIndexDetail.bind(this);
    this.viewInputLatencyDetail = this.viewInputLatencyDetail.bind(this);
    this.hideInputLatencyDetail = this.hideInputLatencyDetail.bind(this);
    this.viewInputLatencyDetail = this.viewInputLatencyDetail.bind(this);
    this.hideInputLatencyDetail = this.hideInputLatencyDetail.bind(this);
    this.viewOpportunityDetail = this.viewOpportunityDetail.bind(this);
    this.hideOpportunityDetail = this.hideOpportunityDetail.bind(this);
    this.viewPassedAuditsDetail = this.viewPassedAuditsDetail.bind(this);
    this.hidePassedAuditsDetail = this.hidePassedAuditsDetail.bind(this);
    this.state = {
      paintDetailShowing: false,
      paintStyle: '',
      firstInteractiveShowing: false,
      consistentlyInteractiveShowing: false,
      speedIndexShowing: false,
      speedStyle: '',
      inputLatencyShowing: false,
      opportunityDetailShowing: false,
      passedAuditsShowing: false
    };
  }

  // toggle for detail views w/ boolean state
  viewPaintDetail() {
    this.setState({
      paintDetailShowing: true
    });
  }

  hidePaintDetail() {
    this.setState({
      paintDetailShowing: false
    });
  }

  viewFirstInteractiveDetail() {
    this.setState({
      firstInteractiveShowing: true
    });
  }

  hideFirstInteractiveDetail() {
    this.setState({
      firstInteractiveShowing: false
    });
  }

  viewConsistentlyInteractiveDetail() {
    this.setState({
      consistentlyInteractiveShowing: true
    });
  }

  hideConsistentlyInteractiveDetail() {
    this.setState({
      consistentlyInteractiveShowing: false
    });
  }

  viewSpeedIndexDetail() {
    this.setState({
      speedIndexShowing: true
    });
  }

  hideSpeedIndexDetail() {
    this.setState({
      speedIndexShowing: false
    });
  }

  viewInputLatencyDetail() {
    this.setState({
      inputLatencyShowing: true
    });
  }

  hideInputLatencyDetail() {
    this.setState({
      inputLatencyShowing: false
    });
  }

  viewOpportunityDetail() {
    this.setState({
      opportunityDetailShowing: true
    });
  }

  hideOpportunityDetail() {
    this.setState({
      opportunityDetailShowing: false
    });
  }

  viewPassedAuditsDetail() {
    this.setState({
      passedAuditsShowing: true
    });
  }

  hidePassedAuditsDetail() {
    this.setState({
      passedAuditsShowing: false
    });
  }

  // assign color to specific score values
  componentWillMount() {
    let data = this.props.data;
    let audits = data.audits;
    let firstPaintValue = audits['first-meaningful-paint']['rawValue'];
    let speedScore = audits['speed-index-metric']['displayValue'];

    var red = {
      color: "red"
    }
    var orange = {
      color: "orange"
    }
    var green = {
      color: "green"
    }

    // first meaningful paint color display
    if (firstPaintValue <= 1600) {
      this.setState({paintStyle: green});
    } else if (firstPaintValue > 1600 && firstPaintValue < 4000) {
      this.setState({paintStyle: orange});
    } else {
      this.setState({paintStyle: red});
    }

    // perceptual speed index color display
    if (speedScore <= 1600) {
      this.setState({speedStyle: green});
    } else if (speedScore > 1600 && speedScore < 4000) {
      this.setState({speedStyle: orange});
    } else {
      this.setState({speedStyle: red});
    }
  }

  render() {
    let data = this.props.data;
    let reports = data.reportCategories;
    let audits = data.audits;

    let performance = reports[1].name;
    let perfDescription = reports[1].description;

    // first paint information and display
    let firstPaint = audits['first-meaningful-paint']['displayValue'];
    let firstPaintOptimal = audits['first-meaningful-paint']['optimalValue'];
    let firstPaintDescript = audits['first-meaningful-paint']['helpText'].replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');

    let paintDisplay;
    if (this.state.paintDetailShowing === false) {
      paintDisplay =
      <div className="well well-sm" >
        <p style={this.state.paintStyle}><a href='#/' onClick={ this.viewPaintDetail }>First meaningful paint:</a> {firstPaint}</p>
      </div>
    } else {
      paintDisplay =
      <div className="well well-sm">
        <p style={this.state.paintStyle}><a href='#/' onClick={ this.hidePaintDetail }>First meaningful paint:</a> {firstPaint}</p>
        <p>(target: {firstPaintOptimal})</p>
        <p>{firstPaintDescript}</p>
      </div>
    }

    // first interactive information and display
    let firstInteractive = audits['first-interactive']['displayValue'];
    let firstInteractiveDescript = audits['first-interactive']['helpText'].replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');
    let firstInteractiveDisplay;
    if (this.state.firstInteractiveShowing === false) {
      firstInteractiveDisplay =
      <div className="well well-sm">
        <p><a href='#/' onClick={ this.viewFirstInteractiveDetail}>First Interactive (beta):</a> {firstInteractive}</p>
      </div>
    } else {
      firstInteractiveDisplay =
      <div className="well well-sm">
        <p><a href='#/' onClick={ this.hideFirstInteractiveDetail }>First Interactive (beta):</a> {firstInteractive}</p>
        <p>{firstInteractiveDescript}</p>
      </div>
    }

    // consistently interactive information and display
    let consistentlyInteractive = audits['consistently-interactive']['displayValue'];
    let consistentlyInteractiveDescript = audits['consistently-interactive']['helpText'].replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');
    let consistentlyInteractiveDisplay;
    if (this.state.consistentlyInteractiveShowing === false) {
      consistentlyInteractiveDisplay =
      <div className="well well-sm">
        <p><a href='#/' onClick={ this.viewConsistentlyInteractiveDetail}>Consistently Interactive (beta):</a> {consistentlyInteractive}</p>
      </div>
    } else {
      consistentlyInteractiveDisplay =
      <div className="well well-sm">
        <p><a href='#/' onClick={ this.hideConsistentlyInteractiveDetail }>Consistently Interactive (beta):</a> {consistentlyInteractive}</p>
        <p>{consistentlyInteractiveDescript}</p>
      </div>
    }

    // perceptual speed index information and display
    let speedScore = audits['speed-index-metric']['displayValue'];
    let optimalSpeed = audits['speed-index-metric']['optimalValue'];
    let speedScoreDescript = audits['speed-index-metric']['helpText'].replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');
    let speedIndexDisplay;
    if (this.state.speedIndexShowing === false) {
      speedIndexDisplay =
      <div className="well well-sm">
        <p style={this.state.speedStyle}><a href='#/' onClick={ this.viewSpeedIndexDetail}>Perceptual Speed Index:</a> {speedScore} ms</p>
      </div>
    } else {
      speedIndexDisplay =
      <div className="well well-sm">
        <p style={this.state.speedStyle}><a href='#/' onClick={ this.hideSpeedIndexDetail }>Perceptual Speed Index:</a> {speedScore} ms</p>
        <p>(target: {optimalSpeed} ms)</p>
        <p>{speedScoreDescript}</p>
      </div>
    }

    // estimated input latency information and display
    let inputLatency = audits['estimated-input-latency']['displayValue'];
    let inputLatencyOptimal = audits['estimated-input-latency']['optimalValue'];
    let inputLatencyDescript = audits['estimated-input-latency']['helpText'].replace(/Learn More/i, '').replace('[', '').replace(']', '').replace('(', '').replace(').', '');
    let inputLatencyDisplay;
    if (this.state.inputLatencyShowing === false) {
      inputLatencyDisplay =
      <div className="well well-sm">
        <p><a href='#/' onClick={ this.viewInputLatencyDetail}>Estimated Input Latency:</a> {inputLatency} (target: {inputLatencyOptimal})</p>
      </div>
    } else {
      inputLatencyDisplay =
      <div className="well well-sm">
        <p><a href='#/' onClick={ this.hideInputLatencyDetail }>Estimated Input Latency:</a> {inputLatency} (target: {inputLatencyOptimal})</p>
        <p>{inputLatencyDescript}</p>
      </div>
    }

    // performance opportunity information and display
    let perfAudit = reports[1].audits;

    let perfOpportunitiesDescript = data.reportGroups['perf-hint']['description'];
    let perfOpportunities = [];
    for (var i = 0; i < perfAudit.length; i++) {
      if (perfAudit[i].group === "perf-hint" && perfAudit[i].score < 100) {
        var perfOpportunityDescript = perfAudit[i].result.description;
        var perfOpportunityHelp = perfAudit[i].result.helpText.replace(/Learn More/i, '').replace('[', '').replace('](', '').replace(').', '');
        perfOpportunities.push(perfOpportunityDescript + ": " + perfOpportunityHelp);
      }
    }
    // maps out each performance opportunity
    let perfOpportunityNodes = perfOpportunities.map(perfOpportunity => {
      return (<p key={perfOpportunity}>- {perfOpportunity}</p>);
    });
    let opportunityDetailDisplay;
    if (this.state.opportunityDetailShowing === false) {
      opportunityDetailDisplay =
      <div className="well well-sm">
        <h5><a href='#/' onClick={ this.viewOpportunityDetail}>Opportunities</a> ({perfOpportunityNodes.length})</h5>
      </div>
    } else {
      opportunityDetailDisplay =
      <div className="well well-sm">
        <h5><a href='#/' onClick={ this.hideOpportunityDetail}>Opportunities</a></h5>
        <h6>{perfOpportunitiesDescript}</h6>
        {perfOpportunityNodes}
      </div>
    }

    // finds all passed audits for performance
    let passedAudits = [];
    for (var i = 0; i < perfAudit.length; i++) {
      if (perfAudit[i].score === 100) {
        var passedAuditDescript = perfAudit[i].result.description;
        var passedAuditHelp = perfAudit[i].result.helpText.replace(/Learn More/i, '').replace('[', '').replace('](', ' ').replace(')', '').replace('[highly correlated]', 'highly correlated').replace(')', '').replace('[layout reflows]', 'layout reflows').replace('),', ',').replace('s(', 's ').replace('[]', ' ').replace('d(', 'd ');
        passedAudits.push(passedAuditDescript + ": " + passedAuditHelp);
      }
    }
    // maps out all passed audits to split them up
    let performancePassNodes = passedAudits.map(passedAudit => {
      return (<div key={passedAudit}><p>- {passedAudit}</p></div>);
    });

    // options for passing audit display
    let passedAuditsDisplay;
    if (this.state.passedAuditsShowing === false) {
      passedAuditsDisplay =
      <div className="well well-sm">
        <h5>{passedAudits.length} <a href='#/' onClick={ this.viewPassedAuditsDetail }>Passed Audits</a></h5>
      </div>
    } else {
      passedAuditsDisplay =
      <div className="well well-sm">
        <h5>{passedAudits.length} <a href='#/' onClick={ this.hidePassedAuditsDetail }>Passed Audits</a></h5>
        {performancePassNodes}
      </div>
    }

    return (
      <div>
        <h4>{performance}</h4>
        <h6>{perfDescription}</h6>

        {paintDisplay}

        {firstInteractiveDisplay}

        {consistentlyInteractiveDisplay}

        {speedIndexDisplay}

        {inputLatencyDisplay}

        {opportunityDetailDisplay}

        {passedAuditsDisplay}
      </div>
    )
  }
}

export default PerformanceDetail;
