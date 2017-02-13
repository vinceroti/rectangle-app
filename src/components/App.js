import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Rectangle from './rectangle';
import { SketchPicker } from 'react-color';

const styles = {
  head: {
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  game: {
    display: 'inline-block',
    position: 'relative',
    boxSizing: 'border-box',
    padding: 5,
    margin: 'auto',
    width: '70%',
    height: 600,
    borderRadius: 4,
    border: '2px solid black',
    backgroundColor: 'white',
    overflow: 'auto'
  },
  gameWrapper: {
  },
  buttons: {
    textAlign: 'center',
  },
  button: {
    margin: '5px'
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this._addRect = this._addRect.bind(this);
    this._removeRect = this._removeRect.bind(this);
    this._clear = this._clear.bind(this);
    this._colorSetter = this._colorSetter.bind(this);
    this._rectChangeCallback = this._rectChangeCallback.bind(this);
  }
  componentWillMount() {
    let newRectList = [];
    if (JSON.parse(localStorage.getItem('rectList'))) {
      var rectList = JSON.parse(localStorage.getItem('rectList'));
    } else {
      rectList = [];
    }

    for (let i = 0; i < rectList.length; i++){
      let rect = rectList[i];
      newRectList.push(<Rectangle rectKey={i} key={i} parentCallBack={this._rectChangeCallback} x={rect['props']['x']} y={rect['props']['y']} width={rect['props']['width']} height={rect['props']['height']} color={rect['props']['color']}/>);
    }
    this.setState({
      rectList: newRectList
    });
  }

  _randColor() {
    let randNum = () => {
      return Math.floor(Math.random() * 256);
    };
    return `rgb(${randNum()},${randNum()},${randNum()})`;
  }

  _addRect() {
    let rectList = this.state.rectList;
    rectList.push(<Rectangle x={0} y={0} rectKey={rectList.length} key={rectList.length} parentCallBack={this._rectChangeCallback} width={200} height={120} color={this._randColor()}/>);
    this.setState({
      rectList: rectList
    });
    localStorage.setItem('rectList', JSON.stringify(rectList));
  }

  _removeRect() {
    let rectList = this.state.rectList;
    rectList.pop();
    this.setState({
      rectList: rectList
    });
    localStorage.setItem('rectList', rectList.length);
  }

  _clear() {
    this.setState({
      rectList: []
    });
    localStorage.setItem('rectList', false);
  }

  _colorSetter() {
    console.log("test")
    this.setState({
      color: this.sketchColor.state.hex
    });
  }

  _rectChangeCallback(key, rectState) {
    let rectList = JSON.parse(localStorage.getItem('rectList'));

    rectList[key]['props']['x'] = rectState.x;
    rectList[key]['props']['y'] = rectState.y;
    rectList[key]['props']['height'] = rectState.height;
    rectList[key]['props']['width'] = rectState.width;
    localStorage.setItem('rectList', JSON.stringify(rectList));
    // save individual rectangle
  }

  render() {
    return (
      <div>
        <h1 style={styles.head}> Rectangle Game </h1>
        <div style={styles.buttons}>
          <Button style={styles.button} onClick={this._addRect} bsStyle="primary">Add Rectangle!</Button>
          <Button style={styles.button} onClick={this._removeRect} bsStyle="primary">Delete Rectangle!</Button>
          <Button style={styles.button} onClick={this._clear} bsStyle="primary">Clear Board!</Button>
        </div>
        <div style={styles.gameWrapper}>
          <div onChange={this.save}  style={styles.game} id="board">
            {this.state.rectList}
          </div>
          <SketchPicker onMouseLeave={this._colorSetter} ref={(e) => { this.sketchColor = e;}}/>
        </div>
      </div>
    );
  }
}
export default App;
