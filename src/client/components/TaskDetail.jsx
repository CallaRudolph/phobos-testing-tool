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
    let formAreaContent;
    if (this.state.detailShowing === false) {
      formAreaContent =
        <a href='#' onClick={ this.viewTaskDetails }>more info</a>
    } else {
      formAreaContent =
        <div>
          <p>{this.props.id}</p>
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
