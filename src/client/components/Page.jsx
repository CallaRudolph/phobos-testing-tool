import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import PageDetail from './PageDetail.jsx';
import ProgressArc from 'progress-arc-component'
import styled, { css } from 'styled-components';

class Page extends Component {
  constructor(props) {
    super(props);
    // state for progress arc color
    this.state = {
      paint: '',
      performance: '',
      bestPractice: '',
      accessibility: '',
    };
  }

  // this section determines the color of each arc
  componentWillMount() {
    let data = this.props.data.data;
    let reports = data.reportCategories;
    let paintScore = parseInt(data.audits['first-meaningful-paint']['score']);
    let performanceScore = parseInt((reports[1].score).toFixed());
    let bestPracticeScore = parseInt((reports[3].score).toFixed());
    let accessibilityScore = parseInt((reports[2].score).toFixed());

    if (paintScore <= 50) {
      this.setState({paint: 'red'});
    } else if (paintScore > 50 && paintScore < 80) {
      this.setState({paint: 'orange'});
    } else {
      this.setState({paint: 'green'});
    }

    if (performanceScore <= 50) {
      this.setState({performance: 'red'});
    } else if (performanceScore > 50 && performanceScore < 80) {
      this.setState({performance: 'orange'});
    } else {
      this.setState({performance: 'green'});
    }

    if (bestPracticeScore <= 50) {
      this.setState({bestPractice: 'red'});
    } else if (bestPracticeScore > 50 && bestPracticeScore < 80) {
      this.setState({bestPractice: 'orange'});
    } else {
      this.setState({bestPractice: 'green'});
    }

    if (accessibilityScore <= 50) {
      this.setState({accessibility: 'red'});
    } else if (accessibilityScore > 50 && accessibilityScore < 80) {
      this.setState({accessibility: 'orange'});
    } else {
      this.setState({accessibility: 'green'});
    }
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

    // this center-aligns the arc titles
    var center = {
      textAlign: "center",
      fontSize: "12px"
    }

    // this makes the progress arcs smaller
    const StyledProgressArc = styled(ProgressArc)`
      height: 4em;
      width: 4em;
    `

    return (
      <Grid>
        <h4>Results for {url}</h4>
        <Row>
          <Col xs={1} md={1}>
            <StyledProgressArc
              value={paintScore}
              arcColor={this.state.paint}/>
            <p style={center}>First Paint</p>
          </Col>
          <Col xs={1} md={1}>
            <StyledProgressArc value={performanceScore}
            arcColor={this.state.performance}/>
            <p style={center}>Performance</p>
          </Col>
          <Col xs={1} md={1}>
            <StyledProgressArc value={bestPracticeScore}
            arcColor={this.state.bestPractice}/>
            <p style={center}>Best Practices</p>
          </Col>
          <Col xs={1} md={1}>
            <StyledProgressArc value={accessibilityScore}
            arcColor={this.state.accessibility}/>
            <p style={center}>Accessibility</p>
          </Col>
        </Row>

        <PageDetail
          data={data}/>
        
      </Grid>
    )
  }
}

export default Page;
