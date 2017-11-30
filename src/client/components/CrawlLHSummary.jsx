import React, { Component } from "react";
import ProgressArc from 'progress-arc-component'
import styled, { css } from 'styled-components';
import { Grid, Col, Row } from 'react-bootstrap';
import LHSummaryDelete from './LHSummaryDelete.jsx';
import axios from 'axios';

class CrawlLHSummary extends Component {
  constructor(props) {
    super(props);
    // state for progress arc color
    this.state = {
      paint: '',
      performance: '',
      bestPractice: '',
      accessibility: '',
    };
    this.handleLighthouseDelete = this.handleLighthouseDelete.bind(this);
  }

  handleLighthouseDelete(id) {
    // id sent from LHSummaryDelete comp to create axios Delete request
    axios.delete('results/' + id)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentWillMount() {
    let paintScore = parseInt(this.props.firstPaint);
    let performanceScore = parseInt(this.props.performance);
    let bestPracticeScore = parseInt(this.props.bestPractices);
    let accessibilityScore = parseInt(this.props.accessibility);

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
    let url = this.props.url;
    let date = this.props.createdAt;

    let paintScore = parseInt(this.props.firstPaint);
    let performanceScore = parseInt(this.props.performance);
    let bestPracticeScore = parseInt(this.props.bestPractices);
    let accessibilityScore = parseInt(this.props.accessibility);

    // spaces out the progress arcs
    var arcStyle = {
      marginRight: "40px"
    }

    // decreases size of arc labels
    var small = {
      textAlign: "center",
      fontSize: "12px",
      whiteSpace: "nowrap"
    }

    // makes the progress arcs smaller
    const StyledProgressArc = styled(ProgressArc)`
      height: 3em;
      width: 3em;
    `

    return (
      <div>
        <Grid>
          <div>
            <div>
              <Row>
                <Col xs={6} md={6}>
                  <h5>{url}</h5>
                </Col>
                <Col style={arcStyle} xs={1} md={1}>
                  <StyledProgressArc
                    value={paintScore}
                    arcColor={this.state.paint}/>
                    <p style={small}>First Paint</p>
                </Col>
                <Col style={arcStyle} xs={1} md={1}>
                  <StyledProgressArc
                    value={performanceScore}
                    arcColor={this.state.performance}/>
                    <p style={small}>Performance</p>
                </Col>
                <Col style={arcStyle} xs={1} md={1}>
                  <StyledProgressArc
                    value={bestPracticeScore}
                    arcColor={this.state.bestPractice}/>
                    <p style={small}>Best Practices</p>
                </Col>
                <Col style={arcStyle} xs={1} md={1}>
                  <StyledProgressArc
                    value={accessibilityScore}
                    arcColor={this.state.accessibility}/>
                    <p style={small}>Accessibility</p>
                </Col>
              </Row>
              <Row>
                <Col xs={3} md={3}>
                  <p>{date}</p>
                </Col>
                <Col xs={4} md={4}>
                  <LHSummaryDelete
                    id={this.props.id}
                    onLighthouseDelete={ this.handleLighthouseDelete}
                  />
                </Col>
                <Col xs={4} md={4}></Col>
              </Row>
              <hr/>
            </div>
          </div>
        </Grid>
      </div>
    )
  }
}

export default CrawlLHSummary;
