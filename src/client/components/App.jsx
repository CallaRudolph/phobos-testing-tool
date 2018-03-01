import React, { Component } from "react";
import TaskInput from './Task/TaskInput.jsx';
import UrlCrawler from './LHCrawlSummary/UrlCrawler.jsx';
import LighthouseDetail from './LHDetail/LighthouseDetail.jsx';
import LHCrawl from './LHCrawl/LHCrawl.jsx';
import LighthouseSingle from './LHSingle.jsx';
import BasicCrawler from './BasicCrawler.jsx';

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h2>Phobos Testing Tool</h2>
        <p><em>A project to automate basic testing of websites using Google Lighthouse API.</em></p>
        {/* <TaskInput/> */}
        {/* <UrlCrawler/>
        <br/> */}
        {/* <LighthouseDetail/>
        <br/> */}
        <LHCrawl/>
        {/* <br/>
        <LighthouseSingle/> */}
        <br/><br/><br/>
        <BasicCrawler/>
      </div>
    )
  }
}

export default App;
