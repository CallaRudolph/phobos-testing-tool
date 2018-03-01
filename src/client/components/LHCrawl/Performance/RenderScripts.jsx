import React, { Component } from "react";

class RenderScripts extends Component {
  render() {
    return (
      <div className='container'>
        <h5>{this.props.url}</h5>
        <ul>
          {this.props.category.map(function(renderScript){
            return <li className="list-unstyled" key={renderScript}>{renderScript}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default RenderScripts;
