import React, { Component } from "react";

class ImageSize extends Component {
  render() {
    return (
      <div className='container'>
        <h5>{this.props.url}</h5>
        <ul>
          {this.props.imageSize.map(function(imageSize){
            return <li className="list-unstyled" key={imageSize}>{imageSize}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default ImageSize;
