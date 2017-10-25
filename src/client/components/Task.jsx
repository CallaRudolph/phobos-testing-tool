import React, { Component } from "react";
import axios from 'axios';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadTasksFromServer() {
    axios.get('http://localhost:3000/api/tasks')
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var task = {'title': this.state.value};
    console.log(task);
    axios.post('http://localhost:3000/api/tasks', task)
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            task:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default Task;
