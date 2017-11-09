import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = this.props.data.initialUrl;
    let firstPaint = this.props.data.audits['first-meaningful-paint']['displayValue'];
    let paintScore = this.props.data.audits['first-meaningful-paint']['score'];
    let speedScore = this.props.data.audits['speed-index-metric']['score'];
    let performanceScore = (this.props.data.reportCategories[1].score).toFixed();
    let bestPracticeScore = (this.props.data.reportCategories[3].score).toFixed();
    let accessibilityScore = (this.props.data.reportCategories[2].score).toFixed();

    return (
      <Grid>
        <h4>{url} summary:</h4>
        <Row>
          <Col xs={2} md={2}>
            <p>First paint: {firstPaint}</p>
          </Col>
          <Col xs={2} md={2}>
            <p>First paint score: {paintScore}</p>
          </Col>
          <Col xs={2} md={2}>
            <p>Perceptual speed score: {speedScore}</p>
          </Col>
          <Col xs={2} md={2}>
            <p>Performance score: {performanceScore}</p>
          </Col>
          <Col xs={2} md={2}>
            <p>Best practice score: {bestPracticeScore}</p>
          </Col>
          <Col xs={2} md={2}>
            <p>Accessibility score: {accessibilityScore}</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Page;
