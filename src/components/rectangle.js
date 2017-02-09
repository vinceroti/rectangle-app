import React, { Component } from 'react';


class Rectangle extends Component {

  render() {
    const style = {
      fill: this.props.customColor ? this.props.customColor : 'rgb(0,0,255)',
      strokeWidth:1,
      stroke: 'rgb(0,0,0)',
    };
    return (
      <svg width="400" height="110">
        <rect width="300" height="100" style={style} />
      </svg>
    );
  }
}
export default Rectangle;
