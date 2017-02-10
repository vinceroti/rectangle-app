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
    padding: 5,
    margin: '0 auto',
    height: '50%',
    width: '70%',
    borderRadius: 12,
    border: '2px solid black',
    backgroundColor: 'white'
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

    this.state = { rectList: [] };
    this._addRect = this._addRect.bind(this);
    this._removeRect = this._removeRect.bind(this);
  }
  componentWillMount() {
    let rectList = this.state.rectList;
    for (let i = 0; i < localStorage.getItem('rectList'); i++){
      rectList = rectList.concat(<Rectangle key={rectList.length + 1} customColor={this._randColor()}/>);
    }
    this.setState({
      rectList: rectList
    });
  }

  _randColor() {
    let randNum = () => { return Math.floor(Math.random() * 256); } ;
    return `rgb(${randNum()},${randNum()},${randNum()})`;
  }

  _addRect() {
    const rectList = this.state.rectList;
    this.setState({
      rectList: rectList.concat(<Rectangle key={rectList.length + 1} customColor={this._randColor()}/>)
    });
    localStorage.setItem('rectList', rectList.length + 1);
  }

  _removeRect() {
    let rectList = this.state.rectList;
    rectList.pop();
    this.setState({
      rectList: rectList
    });
    localStorage.setItem('rectList', rectList.length);
  }


  render() {
    return (
      <div>
        <h1 style={styles.head}> Rectangle Game </h1>
        <div style={styles.buttons}>
          <Button style={styles.button} onClick={this._addRect} bsStyle="primary">Add Rectangle!</Button>
          <Button style={styles.button} onClick={this._removeRect} bsStyle="primary">Delete Rectangle!</Button>
        </div>
        <div style={styles.game} id="board">
          {this.state.rectList}
        </div>
      </div>
    );
  }
}
export default App;
