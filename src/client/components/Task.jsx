import React, { Component } from "react";
import axios from 'axios';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadTasksFromServer() {
    axios.get('http://localhost:3000/api/tasks')
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  handleSubmit() {
    console.log("task added");
  }

  render() {
    return (
      <div>
        <input placeholder="add a task"></input>
        <br/>
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    )
  }
}

export default Task;
