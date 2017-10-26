import React, { Component } from "react";

class TaskDelete extends Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(e) {
    e.preventDefault();
    let id = this.props.id;
    this.props.onTaskDelete(id);
  }

  render() {
    return (
      <div>
        <a href='#' onClick={ this.deleteTask }>delete</a>
      </div>
    )
  }
}

export default TaskDelete;
