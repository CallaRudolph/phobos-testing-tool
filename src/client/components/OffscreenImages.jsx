import React, { Component } from "react";

class OffscreenImages extends Component {
  render() {
    return (
      <div className='container'>
        <h3>{this.props.help}</h3>
        <h4>{this.props.url}</h4>
        <ul>
          {this.props.offscreenImages.map(function(offscreenImage){
            return <li className="list-unstyled" key={offscreenImage}>{offscreenImage}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default OffscreenImages;
