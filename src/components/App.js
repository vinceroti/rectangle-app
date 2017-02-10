import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Rectangle from './rectangle';

const styles = {
  head: {
    marginTop: 40,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  game: {
    boxSizing: 'border-box',
    padding: 5,
    margin: '0 auto',
    height: '50%',
    width: '70%',
    borderRadius: 4,
    border: '2px solid black',
    backgroundColor: 'white',
    overflow: 'auto'
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
  }
  componentWillMount() {
    let newRectList = [];
    if (JSON.parse(localStorage.getItem('rectList'))) {
      var rectList = JSON.parse(localStorage.getItem('rectList'));
    } else {
      rectList = [];
    }

    for (let i = 0; i < rectList.length; i++){
      newRectList.push(<Rectangle key={i + 1} customColor={rectList[i]['props']['customColor']}/>);
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
    rectList.push(<Rectangle key={rectList.length + 1} customColor={this._randColor()}/>);
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
    localStorage.setItem('rectList', []);
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
        <div style={styles.game} id="board">
          {this.state.rectList}
        </div>
      </div>
    );
  }
}
export default App;
