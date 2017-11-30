import React, { Component } from "react";
import TaskInput from './TaskInput.jsx';
import UrlCrawler from './UrlCrawler.jsx';
import LighthouseDetail from './LighthouseDetail.jsx';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h2>Phobos Testing Tool</h2>
        <p><em>description here</em></p>
        {/* <TaskInput/> */}
        <UrlCrawler/>
        <br/>
        <LighthouseDetail/>
      </div>
    )
  }
}

export default App;
