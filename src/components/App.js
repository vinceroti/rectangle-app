import React from 'react';
import { Component } from 'react';
import '../styles/App.css';

const styles = {
  head: {
    marginTop: '40px',
    textAlign: 'center'
  },
  game: {
    margin: '0 auto',
    height: '70%',
    width: '70%',
    padding: '0px 5px 500px 5px',
    borderRadius: '12px',
    border: '2px solid gray'
  }
};

class App extends Component {

  render() {
    return (
    <div className="App">
      <h1 style={styles.head}> Rectangle Game </h1>
      <div style={styles.game}>

      </div>
    </div>
    );
  }
}
export default App;
