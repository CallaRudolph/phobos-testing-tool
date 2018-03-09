import React, { Component } from "react";
import AccessibilityUrls from './AccessibilityUrls.jsx';

class Accessibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childVisible: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(prevState => ({
      childVisible: !prevState.childVisible
    }));
  }

  render() {
    let nodes = this.props.nodes.map(function(node, index) {
      if (node[1][0].length === 0) {
        // this hides a URL that does not have any items found in that accessibility area
        return('')
      } else {
        return(
          <div>
            <h6>{node[0]}</h6>
            <AccessibilityUrls items={node[1]}
                              key={index}
            />
          </div>
        )
      }
    })

    return (
      <div className='container'>
        <h5><a href='#/' onClick={() => this.onClick()}>
          {this.props.verbiage}
        </a></h5>
        <p>{this.props.helpRender}</p>
        { this.state.childVisible && nodes}
      </div>
    )
  }
}

export default Accessibility;
