import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import PageDetail from './PageDetail.jsx';

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data.data;
    let reports = data.reportCategories;
    let url = data.initialUrl;
    let date = this.props.data.headers.date;
    
    let paintScore = data.audits['first-meaningful-paint']['score'];
    let performanceScore = (reports[1].score).toFixed();
    let bestPracticeScore = (reports[3].score).toFixed();
    let accessibilityScore = (reports[2].score).toFixed();

    return (
      <Grid>
        <Row>
          <Col xs={4} md={4}>
            <h4>Results for: {url}</h4>
          </Col>
          <Col xs={6} md={6}>
            <p>{date}</p>
          </Col>
        </Row>
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
          data={data}/>
      </Grid>
    )
  }
}

export default Page;
