import React, { Component } from "react";
import TaskInput from './TaskInput.jsx';
import UrlCrawler from './UrlCrawler.jsx';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h2>Phobos Testing Tool</h2>
        <TaskInput/>
        <UrlCrawler/>
      </div>
    )
  }
}

export default App;
