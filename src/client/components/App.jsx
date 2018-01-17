import React, { Component } from "react";
import TaskInput from './TaskInput.jsx';
import UrlCrawler from './UrlCrawler.jsx';
import LighthouseDetail from './LighthouseDetail.jsx';
import LighthouseSingle from './LHSingle.jsx';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h2>Phobos Testing Tool</h2>
        <p><em>A project to automate basic testing of websites using Google Lighthouse API.</em></p>
        <br/>
        {/* <TaskInput/> */}
        {/* <UrlCrawler/>
        <br/> */}
        <LighthouseDetail/>
        <br/>
        <LighthouseSingle/>
      </div>
    )
  }
}

export default App;
