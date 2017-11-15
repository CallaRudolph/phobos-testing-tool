import React, { Component } from "react";

class PerformanceDetail extends Component {
  constructor(props) {
    super(props);
    this.viewPaintDetail = this.viewPaintDetail.bind(this);
    this.hidePaintDetail = this.hidePaintDetail.bind(this);
    this.state = {
      paintDetailShowing: false,
      paintStyle: ''
    };
  }

  // toggle for detail view w/ boolean state
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

  componentWillMount() {
    let data = this.props.data;
    let audits = data.audits;
    let firstPaintValue = audits['first-meaningful-paint']['rawValue'];

    var red = {
      color: "red"
    }
    var orange = {
      color: "orange"
    }
    var green = {
      color: "green"
    }

    if (firstPaintValue <= 1600) {
      this.setState({paintStyle: green});
    } else if (firstPaintValue > 1600 && firstPaintValue < 4000) {
      this.setState({paintStyle: orange});
    } else {
      this.setState({paintStyle: red});
    }
  }

  render() {
    let data = this.props.data;
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

    let paintDisplay;
    if (this.state.paintDetailShowing === false) {
      paintDisplay =
      <div className="panel-footer" >
        <p style={this.state.paintStyle}><a href='#/' onClick={ this.viewPaintDetail }>First meaningful paint:</a> {firstPaint}</p>
      </div>
    } else {
      paintDisplay =
      <div className="panel-footer">
        <p style={this.state.paintStyle}><a href='#/' onClick={ this.hidePaintDetail }>First meaningful paint:</a> {firstPaint} (target: {firstPaintOptimal})</p>
        <p>{firstPaintDescript}</p>
      </div>
    }

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



    return (
      <div>
        <h4>{performance}</h4>
        <h6>{perfDescription}</h6>

        {paintDisplay}

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
      </div>
    )
  }
}

export default PerformanceDetail;
