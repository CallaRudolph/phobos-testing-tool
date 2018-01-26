import React, { Component } from "react";

class ImageSize extends Component {
  render() {
    return (
      <div className='container'>
        <h4>{this.props.url}</h4>
        <ul>
          {this.props.imagesSize.map(function(imageSize){
            return <li className="list-unstyled" key={imageSize}>{imageSize}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default ImageSize;
