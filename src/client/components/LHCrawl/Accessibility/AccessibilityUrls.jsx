import React, { Component } from "react";
import AccessibilityItems from './AccessibilityItems.jsx';

class AccessibilityUrls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // separates each one into its own line
    let items = this.props.items.map(function(items, index) {
      return(<AccessibilityItems items={items}
                                key={index}/>)
    })

    return (
      <div>
        {items}
      </div>
    )
  }
}

export default AccessibilityUrls;
