import React, { Component } from "react";

class TaskList extends Component {
  render() {
    let taskNodes = this.props.data.map(task => {
      return <li key={task._id}>{task._id}</li>
    });
    return (
      <div>
        <p>these are all of the task id's:</p>
        <ul>
          {taskNodes}
        </ul>
      </div>
    )
  }
}

export default TaskList;
