import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


class Rectangle extends Component {
  constructor(props){
    super(props);
    this._hoverHandle = this._hoverHandle.bind(this);
  }
  componentDidMount(){
    this.setState({x: this.drag.state.x, y: this.drag.state.y});
  }
  _hoverHandle() {
    this.setState({
      x: this.drag.state.x,
      y: this.drag.state.y,
      height: this.box.state.height,
      width: this.box.state.width
    });

    this.props.parentCallBack(this.props.rectKey, this.state);
  }

  render() {
    let styles = {
      button: {
        position: 'absolute',
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        border: 'none',
        borderWidth: 0,
        outline: 0,
        top: this.props.y,
        left: this.props.x
      },
      handle: {
        cursor: 'move',
        padding: 5,
        backgroundColor: '#4B4A4F',
      },
      box: {
        position: 'absolute',
        border: '2px solid black',
        background: this.props.color,
      }
    };
    const tooltip = (
      <Tooltip id="tooltip"><strong>Click to change the color to the color wheel!</strong></Tooltip>
    );

    return (
      <Draggable  ref={(e) => { this.drag = e;}} handle=".handle">
        <button onMouseLeave={this._hoverHandle} style={styles.button}>
          <div style={styles.box}>
            <OverlayTrigger placement="bottom" overlay={tooltip}>

              <ResizableBox ref={(e) => { this.box = e;}} width={this.props.width} height={this.props.height} lockAspectRatio={true}  minConstraints={[50, 30]}>
                <div style={styles.handle} className="handle"></div>
              </ResizableBox>
            </OverlayTrigger>
          </div>
        </button>
      </Draggable>
    );
  }
}
export default Rectangle;
