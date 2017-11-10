import React, { Component } from "react";

class PageDetail extends Component {
  constructor(props) {
    super(props);
    this.viewPageDetails = this.viewPageDetails.bind(this);
    this.hidePageDetails = this.hidePageDetails.bind(this);
    this.state = {
      detailShowing: false
    };
  }

  // toggle for detail view w/ boolean state
  viewPageDetails() {
    this.setState({
      detailShowing: true
    });
  }

  hidePageDetails() {
    this.setState({
      detailShowing: false
    });
  }

  render() {
    let url = this.props.data.initialUrl;
    let progressiveWebApp = this.props.data.reportCategories[0].name;
    let pwaDescription = this.props.data.reportCategories[0].description;
    let performance = this.props.data.reportCategories[1].name;
    let perfDescription = this.props.data.reportCategories[1].description;
    let firstPaint = this.props.data.audits['first-meaningful-paint']['displayValue'];
    let speedScore = this.props.data.audits['speed-index-metric']['score'];
    let optimalSpeed = this.props.data.audits['speed-index-metric']['optimalValue'];
    let accessibility = this.props.data.reportCategories[2].name;
    let accDescription = this.props.data.reportCategories[2].description;
    let bestPractices = this.props.data.reportCategories[3].name;
    let bpDescription = this.props.data.reportCategories[3].description;

    // formAreaContent for render return value based on boolean
    let formAreaContent;
    if (this.state.detailShowing === false) {
      formAreaContent =
        <a href='#' onClick={ this.viewPageDetails }>show details for {url}</a>
    } else {
      formAreaContent =
        <div>
          <a href='#' onClick={ this.hidePageDetails }>hide details for {url}</a>
          <h4>{progressiveWebApp}</h4>
          <h6>{pwaDescription}</h6>
          <p>map through audit result scores and show false (fails)</p>

          <h4>{performance}</h4>
          <h6>{perfDescription}</h6>
          <p>First meaningful paint {firstPaint}</p>
          <p>Perceptual Speed Index: {speedScore} (target: {optimalSpeed})</p>
          <p>opportunities vs. diagnostics: map through audit result scores and show false (fails) vs. diagnostics</p>

          <h4>{accessibility}</h4>
          <h6>{accDescription}</h6>
          <p>map through audit result scores and show false (fails)</p>

          <h4>{bestPractices}</h4>
          <h6>{bpDescription}</h6>
          <p>map through audit result scores and show false (fails)</p>
        </div>
    }
    return (
      <div>
        {formAreaContent}
      </div>
    )
  }
}

export default PageDetail;
