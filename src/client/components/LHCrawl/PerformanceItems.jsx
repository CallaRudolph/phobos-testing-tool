import React, { Component } from "react";

class PerformanceItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.items.map(function(item){
            return <li className="list-unstyled" key={item}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default PerformanceItems;
