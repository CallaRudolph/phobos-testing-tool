import React, { Component } from "react";
import PerformanceItems from './PerformanceItems.jsx';

class PerformanceUrls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = this.props.items.map(function(items, index) {
      return(<PerformanceItems items={items}
                                key={index}/>)
    })
    return (
      <div>
        {items}
      </div>
    )
  }
}

export default PerformanceUrls;
