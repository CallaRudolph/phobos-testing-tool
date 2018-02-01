import React, { Component } from "react";
import { Grid, Col, Row } from 'react-bootstrap';
import ProgressArc from 'progress-arc-component';
import styled, { css } from 'styled-components';

class ProgressArcs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paint: '',
      performance: '',
      bestPractice: '',
      accessibility: ''
    };
  }

  componentDidMount(){
    let paintScore = parseInt(this.props.firstPaintScore);
    let performanceScore = parseInt(this.props.performanceScore);
    let bestPracticeScore = parseInt(this.props.bestPracticesScore);
    let accessibilityScore = parseInt(this.props.accessibilityScore);

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

    let paintScore = this.props.paintScore;
    let performanceScore = this.props.performanceScore;
    let bestPracticeScore = this.props.bestPracticeScore;
    let accessibilityScore = this.props.accessibilityScore;

    return (
      <div>
        <Grid>
          <div>
            <div>
              <Row>
                <Col xs={4} md={4}>
                  <h5>{this.props.url}</h5>
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
              <hr/>
            </div>
          </div>
        </Grid>
      </div>
    )
  }
}

export default ProgressArcs;
