import React, { Component } from "react";
import PerformanceUrls from './PerformanceUrls.jsx';

class Performance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsVisible: false
    };
    this.viewItems = this.viewItems.bind(this);
    this.hideItems = this.hideItems.bind(this);
  }

  viewItems() {
    this.setState({
      itemsVisible: true
    });
  }

  hideItems() {
    this.setState({
      itemsVisible: false
    });
  }

  render() {
    let nodes = this.props.nodes.map(function(node, index) {
      if (node[1][0].length === 0) {
        // this hides a URL that does not have any items found in that performance area
        return('')
      } else {
        return(
          <div>
            <h6>{node[0]}</h6>
            <PerformanceUrls items={node[1]}
                              key={index}
            />
          </div>
        )
      }
    })

    let display;
    if (this.state.itemsVisible === false) {
      display =
        <div>
          <h5><a href='#/' onClick={this.viewItems}>
            {this.props.verbiage}
          </a></h5>
          <p>{this.props.helpRender}</p>
        </div>
    } else {
      display =
        <div>
          <h5><a href='#/' onClick={this.hideItems}>
            {this.props.verbiage}
          </a></h5>
          <p>{this.props.helpRender}</p>
          {nodes}
        </div>
    }
    
    return (
      <div className='container'>
        {display}
      </div>
    )
  }
}

export default Performance;
