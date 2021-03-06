import React, { Component } from "react";
import TaskDetail from './TaskDetail.jsx';
import TaskDelete from './TaskDelete.jsx';

class Task extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // continues path for Delete function
    return (
      <div>
        <h3>{this.props.title}</h3>
        <TaskDetail
          id={this.props.id}
          time={this.props.time}
          details={this.props.details}/>
        <TaskDelete
          onTaskDelete={this.props.onTaskDelete}
          id={this.props.id}/>
          <hr/>
      </div>
    )
  }
}

export default Task;
