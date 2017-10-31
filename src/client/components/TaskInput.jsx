import React, { Component } from "react";
import TaskList from './TaskList.jsx';
import axios from 'axios';
import { Button } from "react-bootstrap";

class TaskInput extends Component {
  constructor(props) {
    super(props);
    // each new mongo field needs an initial empty state for React
    this.state = { title: '', time: '', details: '', data: []};
    this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDetailsChange = this.handleDetailsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
  }

  loadTasksFromServer() {
    // makes axios Get request to save all data into state
    axios.get('https://phobos-testing-tool.herokuapp.com/task')
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  // each new mongo input field needs state change handler as JSON
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
    // retrieves input state
    var task = {'title': this.state.title, 'time': this.state.time, 'details': this.state.details};
    // sends axios Post request with new input to mongo
    axios.post('https://phobos-testing-tool.herokuapp.com/task', task)
    .catch(err => {
      console.error(err);
    });
    this.state.title = '';
    this.state.time = '';
    this.state.details = '';
  }

  handleTaskDelete(id) {
    // id sent from Delete comp to create axios Delete request
    axios.delete('https://phobos-testing-tool.herokuapp.com/task' + id)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
  }

  componentDidMount() {
    // loads all tasks from axios Get request when comp loads
    this.loadTasksFromServer();
    setInterval(this.loadTasksFromServer, 2000);
  }

  render() {
    // retrieves all tasks stored to state
    var allTasks = this.state.data;
    // maps out each task to send to TaskList child comp
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
