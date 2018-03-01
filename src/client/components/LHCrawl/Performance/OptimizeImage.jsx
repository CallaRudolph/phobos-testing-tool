import React, { Component } from "react";

class OptimizeImage extends Component {
  render() {
    return (
      <div className='container'>
        <h5>{this.props.url}</h5>
        <ul>
          {this.props.category.map(function(optimizeImage){
            return <li className="list-unstyled" key={optimizeImage}>{optimizeImage}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default OptimizeImage;
