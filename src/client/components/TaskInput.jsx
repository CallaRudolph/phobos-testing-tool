import React, { Component } from "react";
import TaskList from './TaskList.jsx';
import axios from 'axios';

class TaskInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', data: []};
    this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskDelete = this.handleTaskDelete.bind(this);
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
    let tasks = this.state.data;
    var task = {'title': this.state.value};
    axios.post('http://localhost:3000/api/tasks', task)
    .catch(err => {
      console.error(err);
    });
    this.state.value = '';
  }

  handleTaskDelete(id){
    console.log(id);
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
            placeholder="enter a task" type="text" value={this.state.value} onChange={this.handleChange} />
          <br/>
          <input type="submit" value="submit" />
        </form>
        <TaskList
          data={ taskNodes }
          onTaskDelete={ this.handleTaskDelete }/>
      </div>
    )
  }
}

export default TaskInput;
