import React, { Component } from "react";

class OffscreenImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      offscreenImages: this.props.offscreenImages
    };
  }

  render() {
    return (
      <div className='container'>
        <h5>{this.state.url}</h5>
        <ul>
          {this.state.offscreenImages.map(function(offscreenImage){
            return <li className="list-unstyled" key={offscreenImage}>{offscreenImage}</li>
          })}
        </ul>
      </div>
    )
  }
}

export default OffscreenImages;
