import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable'; // Both at the same time

const style = {
  width: 200,
  height: 120,
  display: 'inline-block',
  position: 'relative',
  border: '1px solid black'
};


class Rectangle extends Component {
  render() {

    return (
      <div>
        <Draggable handle=".handle">
             <div>
               <div className="handle">Drag from here</div>
               <ResizableBox color={this.props.customColor} width={200} height={120} lockAspectRatio={true}  minConstraints={[50, 30]}/>
             </div>
           </Draggable>


      </div>
    );
  }
}
export default Rectangle;
