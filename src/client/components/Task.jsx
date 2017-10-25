import React, { Component } from "react";
import axios from 'axios';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadTasksFromServer() {
    axios.get('http://localhost:3000/api/tasks')
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { _title } = this.refs;
    console.log(_title.value);
    var sample = _title.value;
    var task = {'title': sample};
    console.log(task);
    // let tasks = this.state.data;
    // let newTasks = tasks.concat([_title.value]);
    // this.setState({ data: newTasks });
    axios.post('http://localhost:3000/api/tasks', task)
    .catch(err => {
      console.error(err);

    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            ref="_title"
            type="text"
            id="title"
            placeholder="add a task"/>
          <br/>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }
}

export default Task;
