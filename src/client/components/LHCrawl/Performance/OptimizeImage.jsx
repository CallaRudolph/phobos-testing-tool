import React, { Component } from "react";

class OptimizeImage extends Component {
  render() {
    return (
      <div className='container'>
        <h4>{this.props.url}</h4>
        <ul>
          {this.props.optimizeImages.map(function(optimizeImage){
            return <li className="list-unstyled" key={optimizeImage}>{optimizeImage}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default OptimizeImage;
