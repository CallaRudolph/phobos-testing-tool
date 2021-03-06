import React, { Component } from "react";
import Task from './Task.jsx';

class TaskList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // maps out each piece of one task; sends Delete function down
    let taskNodes = this.props.data.map(task => {
      return (
        <Task
          key={ task._id }
          id={ task._id }
          title={ task.title }
          time={ task.time }
          details={ task.details}
          onTaskDelete={this.props.onTaskDelete}/>
      )
    });
    let formAreaContent;
    if (taskNodes.length < 1) {
      formAreaContent = ''
    } else {
      formAreaContent =
        <div>
          <h5>these are all of the tasks:</h5>
          { taskNodes }
        </div>
    }
    return (
      <div>
        {formAreaContent}
      </div>
    )
  }
}

export default TaskList;
