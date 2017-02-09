import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable'; // Both at the same time

const style = {
  wrapper: {
    display: 'inline-block'
  },
  handle: {
    cursor: 'pointer',
    padding: 10
  },
};

class Rectangle extends Component {
  render() {

    return (
      <div style={style.wrapper} >
        <Draggable handle=".handle">
          <div>
           <ResizableBox color={this.props.customColor} width={200} height={120} lockAspectRatio={true}  minConstraints={[50, 30]}>
            <div style={style.handle} className="handle"></div>
          </ResizableBox>
          </div>
        </Draggable>
      </div>
    );
  }
}
export default Rectangle;
