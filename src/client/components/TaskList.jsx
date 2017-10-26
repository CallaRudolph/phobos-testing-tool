import React, { Component } from "react";
import Task from './Task.jsx';

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let taskNodes = this.props.data.map(task => {
      return (
        <Task
          key={ task._id }
          id={ task._id }
          title={ task.title }
          onTaskDelete={this.props.onTaskDelete}/>
      )
    });
    return (
      <div>
        <p>these are all of the tasks:</p>
        { taskNodes }
      </div>
    )
  }
}

export default TaskList;
