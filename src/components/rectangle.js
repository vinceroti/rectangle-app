import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';


class Rectangle extends Component {
  render() {
    return (
      <ResizableBox color={this.props.customColor} width={200} height={120} lockAspectRatio={true}  minConstraints={[50, 30]}/>
    );
  }
}
export default Rectangle;
