import React, { Component } from "react";

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let displayValue = this.props.data.audits['first-meaningful-paint']['displayValue'];
    let paintScore = this.props.data.audits['first-meaningful-paint']['score'];
    let speedScore = this.props.data.audits['speed-index-metric']['score'];
    let performanceScore = this.props.data.reportCategories[1].score;
    let bestPracticeScore = this.props.data.reportCategories[3].score;
    let accessibilityScore = this.props.data.reportCategories[2].score;

    return (
      <div>
        <p>Display value: {displayValue}</p>
        <p>First meaningful paint score: {paintScore}</p>
        <p>Perceptual speed score: {speedScore}</p>
        <p>Performance score: {performanceScore}</p>
        <p>Best practice score: {bestPracticeScore}</p>
        <p>Accessibility score: {accessibilityScore}</p>
      </div>
    )
  }
}

export default Page;
