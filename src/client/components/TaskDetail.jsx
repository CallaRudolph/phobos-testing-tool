import React, { Component } from "react";

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.viewTaskDetails = this.viewTaskDetails.bind(this);
    this.hideTaskDetails = this.hideTaskDetails.bind(this);
    this.state = {
      detailShowing: false
    };
  }

  // toggle for detail view w/ boolean state
  viewTaskDetails() {
    this.setState({
      detailShowing: true
    });
  }

  hideTaskDetails() {
    this.setState({
      detailShowing: false
    });
  }

  render() {
    // formAreaContent for render return value based on boolean
    let formAreaContent;
    if (this.state.detailShowing === false) {
      formAreaContent =
        <a href='#' onClick={ this.viewTaskDetails }>more info</a>
    } else {
      formAreaContent =
        <div>
          <p>complete: {this.props.time}</p>
          <p>details: {this.props.details}</p>
          <a href='#' onClick={ this.hideTaskDetails }>hide info</a>
        </div>
    }
    return (
      <div>
        {formAreaContent}
      </div>
    )
  }
}

export default TaskDetail;
