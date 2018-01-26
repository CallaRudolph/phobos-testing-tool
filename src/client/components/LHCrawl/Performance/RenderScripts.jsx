import React, { Component } from "react";

class RenderScripts extends Component {
  render() {
    return (
      <div className='container'>
        <h4>{this.props.url}</h4>
        <ul>
          {this.props.renderScripts.map(function(renderScript){
            return <li className="list-unstyled" key={renderScript}>{renderScript}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default RenderScripts;
