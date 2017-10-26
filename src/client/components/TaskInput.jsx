import React, { Component } from "react";
import TaskList from './TaskList.jsx';
import axios from 'axios';
import { Button } from "react-bootstrap";

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', time: '', details: '', data: []};
    this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
  }

  loadTasksFromServer() {
    axios.get('http://localhost:3000/api/tasks')
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  handleTaskChange(event) {
    this.setState({title: event.target.value});
  }

  handleTimeChange(event) {
    this.setState({time: event.target.value});
  }

  handleDetailsChange(event) {
    this.setState({details: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let tasks = this.state.data;
    var task = {'title': this.state.title, 'time': this.state.time, 'details': this.state.details};
    axios.post('http://localhost:3000/api/tasks', task)
    .catch(err => {
      console.error(err);
    });
    this.state.title = '';
    this.state.time = '';
    this.state.details = '';
  }

  handleTaskDelete(id) {
    axios.delete('http://localhost:3000/api/tasks/' + id)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount() {
    this.loadTasksFromServer();
    setInterval(this.loadTasksFromServer, 2000);
  }

  render() {
    var allTasks = this.state.data;
    let taskNodes = allTasks.map(task => {
      return (task)
    });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="enter a task" type="text" value={this.state.title} onChange={this.handleTaskChange} />
          <input
            placeholder="enter a time" type="text" value={this.state.time} onChange={this.handleTimeChange} />
          <input
            placeholder="more details" type="text" value={this.state.details} onChange={this.handleDetailsChange} />
          <br/>
          <Button bsStyle="info" bsSize="xsmall" type="submit">submit</Button>
        </form>
        <TaskList
          data={ taskNodes }
          onTaskDelete={ this.handleTaskDelete }/>
      </div>
    )
  }
}

export default TaskInput;
