import React, { Component } from "react";

class RenderSheets extends Component {
  render() {
    return (
      <div className='container'>
        <h5>{this.props.url}</h5>
        <ul>
          {this.props.category.map(function(renderSheet){
            return <li className="list-unstyled" key={renderSheet}>{renderSheet}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default RenderSheets;
