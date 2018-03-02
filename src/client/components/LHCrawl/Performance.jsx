import React, { Component } from "react";

class Performance extends Component {
  render() {
    return (
      <div className='container'>
        <h6>{this.props.url}</h6>
        <ul>
          {this.props.category.map(function(item){
            return <li className="list-unstyled" key={item}>{item}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default Performance;
