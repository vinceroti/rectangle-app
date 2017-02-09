import React, { Component } from 'react';
import '../styles/App.css';
import { Button } from 'react-bootstrap';

const styles = {
  head: {
    marginTop: 40,
    textAlign: 'center'
  },
  game: {
    margin: '0 auto',
    height: 500,
    width: '70%',
    minWidth: 300,
    borderRadius: 12,
    border: '2px solid gray',
    backgroundColor: 'white'
  },
  buttons: {
    textAlign: 'center',
    marginBottom: 10
  }
};

class App extends Component {

  render() {
    return (
    <div className="App">
      <h1 style={styles.head}> Rectangle Game </h1>
      <div style={styles.buttons}>
        <Button bsStyle="primary">Start</Button>
      </div>
      <div style={styles.game}>

      </div>
    </div>
    );
  }
}
export default App;
