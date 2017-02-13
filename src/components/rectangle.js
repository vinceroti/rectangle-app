import React, { Component } from 'react';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


class Rectangle extends Component {
  constructor(props){
    super(props);
    this._hoverHandle = this._hoverHandle.bind(this);
    this._clickHandle = this._clickHandle.bind(this);
    this.state = {
      color: this.props.color,
      height: this.props.height ? this.props.height : 120,
      width: this.props.width ? this.props.width : 200
    };
  }
  _hoverHandle() {
    this.setState({
      x: this.drag.state.x + this.props.x,
      y: this.drag.state.y + this.props.y,
      height: this.box.state.height,
      width: this.box.state.width,
      color: this.state.color
    });

    this.props.parentCallBack(this.props.rectKey, this.state);
  }

  _clickHandle() {
    this.setState({
      color: this.props.sketchColor.state.hex
    });
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
        background: this.state.color,
      }
    };
    const tooltip = (
      <Tooltip id="tooltip"><strong>Click to change the color to the color wheel!</strong></Tooltip>
    );

    return (
      <Draggable  ref={(e) => { this.drag = e;}} handle=".handle">
        <button onMouseLeave={this._hoverHandle} onMouseOver={this._hoverHandle} onMouseEnter={this._hoverHandle} onClick={this._clickHandle} style={styles.button}>
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
