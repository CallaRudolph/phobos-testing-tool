import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import PageDetail from './PageDetail.jsx';
import ProgressArc from 'progress-arc-component'

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let data = this.props.data.data;
    let reports = data.reportCategories;
    let url = data.initialUrl;
    // do you want the date?
    // let date = this.props.data.headers.date;

    let paintScore = parseInt(data.audits['first-meaningful-paint']['score']);
    let performanceScore = parseInt((reports[1].score).toFixed());
    let bestPracticeScore = parseInt((reports[3].score).toFixed());
    let accessibilityScore = parseInt((reports[2].score).toFixed());

    var center = {
      textAlign: "center"
    }

    return (
      <Grid>
        <h4>Results for {url}</h4>
        <Row>
          <Col xs={2} md={2}>
            <ProgressArc value={paintScore}/>
            <p style={center}>First Paint</p>
          </Col>
          <Col xs={2} md={2}>
            <ProgressArc value={performanceScore}/>
            <p style={center}> Performance</p>
          </Col>
          <Col xs={2} md={2}>
            <ProgressArc value={bestPracticeScore}/>
            <p style={center}>Best Practices</p>
          </Col>
          <Col xs={2} md={2}>
            <ProgressArc value={accessibilityScore}/>
            <p style={center}> Accessibility</p>
          </Col>
        </Row>
        <PageDetail
          data={data}/>
      </Grid>
    )
  }
}

export default Page;
