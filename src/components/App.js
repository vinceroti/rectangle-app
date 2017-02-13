import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';
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
    this._rectChangeCallback = this._rectChangeCallback.bind(this);
    this._getRectsFromLocal = this._getRectsFromLocal.bind(this);
  }

  _getRectsFromLocal(layout) {
    let newRectList = [];
    if (JSON.parse(localStorage.getItem('rectList' + layout))) {
      var rectList = JSON.parse(localStorage.getItem('rectList' + layout));
    } else {
      rectList = [];
    }

    for (let i = 0; i < rectList.length; i++){
      let rect = rectList[i]; // if two elements are created with the same key, they have the same properties
      newRectList.push(<Rectangle rectKey={i} key={`rectList${layout}-${i}`} parentCallBack={this._rectChangeCallback} x={rect['props']['x']} y={rect['props']['y']} width={rect['props']['width']} height={rect['props']['height']} color={rect['props']['color']}/>);
    }

    this.setState({
      layout: layout,
      rectList: newRectList
    });
  }

  componentWillMount() {
    this.setState({
      layout: 1
    });
    this._getRectsFromLocal(1);
  }

  _addRect() {
    let layout = this.state.layout;
    let rectList = this.state.rectList;

    rectList.push(<Rectangle x={0} y={0} rectKey={rectList.length} key={`rectList${layout}-${rectList.length}`} parentCallBack={this._rectChangeCallback} width={200} height={120} color={this.sketchColor.state.hex}/>);
    this.setState({
      rectList: rectList
    });
    localStorage.setItem('rectList' + layout, JSON.stringify(rectList));
  }

  _removeRect() {
    let rectList = this.state.rectList;
    rectList.pop();
    this.setState({
      rectList: rectList
    });
    localStorage.setItem('rectList' + this.state.layout, rectList.length);
  }

  _clear() {
    this.setState({
      rectList: []
    });
    localStorage.setItem('rectList' + this.state.layout, false);
  }


  _rectChangeCallback(key, rectState) {
    let layout =  this.state.layout;
    let rectList = JSON.parse(localStorage.getItem('rectList' + layout) );

    rectList[key]['props']['x'] = rectState.x;
    rectList[key]['props']['y'] = rectState.y;
    rectList[key]['props']['height'] = rectState.height;
    rectList[key]['props']['width'] = rectState.width;
    localStorage.setItem('rectList' + layout , JSON.stringify(rectList));
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
          <DropdownButton style={styles.button} bsStyle="primary" title={`Layout ${this.state.layout}`} id="bg-justified-dropdown">
            <MenuItem onClick={()=> {this._getRectsFromLocal(1);}} eventKey="1">Layout 1</MenuItem>
            <MenuItem onClick={()=> {this._getRectsFromLocal(2);}}  eventKey="2">Layout 2</MenuItem>
            <MenuItem onClick={()=> {this._getRectsFromLocal(3) ;}}  eventKey="3">Layout 3</MenuItem>
          </DropdownButton>
        </div>
        <div style={styles.gameWrapper}>
          <div onChange={this.save}  style={styles.game}>
            {this.state.rectList}
          </div>
          <SketchPicker ref={(e) => { this.sketchColor = e;}}/>
        </div>
      </div>
    );
  }
}
export default App;
