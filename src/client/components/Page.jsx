import React, { Component } from "react";

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let firstPaint = this.props.data.audits['first-meaningful-paint']['displayValue'];
    let paintScore = this.props.data.audits['first-meaningful-paint']['score'];
    let speedScore = this.props.data.audits['speed-index-metric']['score'];
    let performanceScore = (this.props.data.reportCategories[1].score).toFixed();
    let bestPracticeScore = this.props.data.reportCategories[3].score;
    let accessibilityScore = (this.props.data.reportCategories[2].score).toFixed();

    return (
      <div>
        <p>First paint: {firstPaint}</p>
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
