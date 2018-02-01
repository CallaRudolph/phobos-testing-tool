import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import PageDetail from './PageDetail.jsx';
import ProgressArc from 'progress-arc-component'
import styled, { css } from 'styled-components';
var dateFormat = require('dateformat');

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
    let date = dateFormat(this.props.data.headers.date, "dddd, mmmm dS, yyyy, h:MM:ss TT");

    let paintScore = parseInt(data.audits['first-meaningful-paint']['score']);
    let performanceScore = parseInt((reports[1].score).toFixed());
    let bestPracticeScore = parseInt((reports[3].score).toFixed());
    let accessibilityScore = parseInt((reports[2].score).toFixed());

    // increases top padding on date
    var dateStyle = {
      paddingTop: "9px"
    }

    // center-aligns the arc titles
    var center = {
      textAlign: "center",
      fontSize: "13px",
      whiteSpace: "nowrap"
    }

    // spaces out the progress arcs
    var arcStyle = {
      marginRight: "40px"
    }

    // makes the progress arcs smaller
    const StyledProgressArc = styled(ProgressArc)`
      height: 4em;
      width: 4em;
    `

    return (
      <Grid>
        <div>
          <div>
            <Row>
              <Col xs={7} md={7}>
                <h4>Results for {url}</h4>
              </Col>
              <Col xs={4} md={4}>
                <p style={dateStyle}>{date}</p>
              </Col>
              <Col xs={1} md={1}></Col>
            </Row>
            <Row>
              <Col xs={4} md={4}></Col>
              <Col style={arcStyle} xs={1} md={1}>
                <StyledProgressArc
                  value={paintScore}
                  arcColor={this.state.paint}/>
                  <h6 style={center}>First Paint</h6>
              </Col>
              <Col style={arcStyle} xs={1} md={1}>
                <StyledProgressArc
                  value={performanceScore}
                  arcColor={this.state.performance}/>
                  <h6 style={center}>Performance</h6>
              </Col>
              <Col style={arcStyle} xs={1} md={1}>
                <StyledProgressArc
                  value={bestPracticeScore}
                  arcColor={this.state.bestPractice}/>
                  <h5 style={center}>Best Practices</h5>
              </Col>
              <Col style={arcStyle} xs={1} md={1}>
                <StyledProgressArc
                  value={accessibilityScore}
                  arcColor={this.state.accessibility}/>
                  <h5 style={center}>Accessibility</h5>
              </Col>
              <Col xs={4} md={4}></Col>
            </Row>
          </div>
        </div>

        <PageDetail
          data={data}/>

      </Grid>
    )
  }
}

export default Page;
