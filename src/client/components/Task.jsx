import React, { Component } from "react";
import axios from 'axios';

class Task extends Component {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(e) {
    e.preventDefault();
    let id = this.props.id;
    this.props.onTaskDelete(id);
    console.log('deleted');
  }

  render() {
    return (
      <div>
        <a href='#' onClick={ this.deleteTask }>{this.props.title}</a>
      </div>
    )
  }
}

export default Task;
