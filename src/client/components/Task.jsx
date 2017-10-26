import React, { Component } from "react";
import TaskDetail from './TaskDetail.jsx';

class Task extends Component {
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
        <p>{this.props.title}</p>
        <a href='#' onClick={ this.deleteTask }>delete {this.props.title}</a>
        <TaskDetail
          title={this.props.title}
          id={this.props.id}/>
      </div>
    )
  }
}

export default Task;
