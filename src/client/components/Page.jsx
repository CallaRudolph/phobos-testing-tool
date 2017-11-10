import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import PageDetail from './PageDetail.jsx';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = this.props.data.initialUrl;
    let paintScore = this.props.data.audits['first-meaningful-paint']['score'];
    let performanceScore = (this.props.data.reportCategories[1].score).toFixed();
    let bestPracticeScore = (this.props.data.reportCategories[3].score).toFixed();
    let accessibilityScore = (this.props.data.reportCategories[2].score).toFixed();

    return (
      <Grid>
        <h4>Results for: {url}</h4>
        <Row>
          <Col xs={2} md={2}>
            <p>First paint score: {paintScore}</p>
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
        <PageDetail
          data={this.props.data}/>
      </Grid>
    )
  }
}

export default Page;
