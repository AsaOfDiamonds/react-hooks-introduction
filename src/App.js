// import React, { Component } from 'react';
import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';


// class App extends Component {
const App = props => {
  const [state, setState] = useState({
      selectedCharacter: 1,
      side: 'light',
      destroyed: false
    });
  
  // state = {
  //   selectedCharacter: 1,
  //   side: 'light',
  //   destroyed: false
  // };

  // make functions into a const
  // sideHandler = side => {
    const sideHandler = side => {
    // remove this.
    setState({ side: side });
  };

  // make functions into a const
  // charSelectHandler = event => {
    const charSelectHandler = event => {
    // remove this.
    const charId = event.target.value;
    setState({ selectedCharacter: charId });
  };

  // make functions into a const
  // destructionHandler = () => {
    const destructionHandler = () => {
    // remove this.
    setState({ destroyed: true });
  };

  // render() {
    let content = (
      <React.Fragment>
        <CharPicker
          side={this.state.side}
          selectedChar={this.state.selectedCharacter}
          onCharSelect={this.charSelectHandler}
        />
        <Character selectedChar={this.state.selectedCharacter} />
        <button onClick={this.sideHandler.bind(this, 'light')}>
          Light Side
        </button>
        <button onClick={this.sideHandler.bind(this, 'dark')}>Dark Side</button>
        {this.state.side === 'dark' && (
          <button onClick={this.destructionHandler}>DESTROY!</button>
        )}
      </React.Fragment>
    );

    if (this.state.destroyed) {
      content = <h1>Total destruction!</h1>;
    }
    return content;
  // }
}

export default App;
