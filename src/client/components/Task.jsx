import React, { Component } from "react";
import TaskDetail from './TaskDetail.jsx';
import TaskDelete from './TaskDelete.jsx';

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>{this.props.title}</p>
        <TaskDelete
          onTaskDelete={this.props.onTaskDelete}
          id={this.props.id}/>
        <TaskDetail
          title={this.props.title}
          id={this.props.id}/>
      </div>
    )
  }
}

export default Task;
