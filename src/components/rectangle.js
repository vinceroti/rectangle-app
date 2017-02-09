import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable'; // Both at the same time


class Rectangle extends Component {

  render() {
    const style = {
      wrapper: {
        display: 'inline-block',
      },
      handle: {
        cursor: 'pointer',
        padding: 10
      },
      box: {
        display: 'inlineBlock',
        position: 'relative',
        border: '2px solid black',
        background: this.props.customColor
      }
    };

    return (
      <div style={style.wrapper} >
        <Draggable handle=".handle">
          <div style={style.box}>
           <ResizableBox  width={200} height={120} lockAspectRatio={true}  minConstraints={[50, 30]}>
            <div style={style.handle} className="handle"></div>
          </ResizableBox>
          </div>
        </Draggable>
      </div>
    );
  }
}
export default Rectangle;
