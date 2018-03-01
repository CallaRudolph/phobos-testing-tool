import React, { Component } from "react";

class OffscreenImages extends Component {
  render() {
    return (
      <div className='container'>
        <h5>{this.props.url}</h5>
        <ul>
          {this.props.category.map(function(offscreenImage){
            return <li className="list-unstyled" key={offscreenImage}>{offscreenImage}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default OffscreenImages;
