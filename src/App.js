// import React, { Component } from 'react';
import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';

// Paused 11:31
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
  // remove this. from this.setState
  // sideHandler = side => {    
  //   this.setState({ side: side });
  // };

  const sideHandler = side => {    
    setState({ side: side });
  };

  // make functions into a const
  // remove this. from this.setState
  // charSelectHandler = event => {
  //   const charId = event.target.value;
  //   this.setState({ selectedCharacter: charId });
  // };

  const charSelectHandler = event => {
    const charId = event.target.value;
    setState({ selectedCharacter: charId });
  };

  
  // make functions into a const
  // remove this. from this.setState
  // destructionHandler = () => {
  // this.setState({ destroyed: true });
  // };

  const destructionHandler = () => {
    setState({ destroyed: true });
  };

  
  //  render() {
  //   let content = (
  //     <React.Fragment>

  //       <CharPicker
  //         side={this.state.side}
  //         selectedChar={this.state.selectedCharacter}
  //         onCharSelect={this.charSelectHandler}
  //       />
  //       <Character selectedChar={this.state.selectedCharacter} />
  //       <button onClick={this.sideHandler.bind(this, 'light')}>
  //         Light Side
  //       </button>
  //       <button onClick={this.sideHandler.bind(this, 'dark')}>Dark Side</button>
  //       {this.state.side === 'dark' && (
  //         <button onClick={this.destructionHandler}>DESTROY!</button>
  //       )}
  //     </React.Fragment>
  //   );

  //   if (this.state.destroyed) {
  //     content = <h1>Total destruction!</h1>;
  //   }
  //   return content;
  //  }

  // remove render and this.
  let content = (
        <React.Fragment>
  
          <CharPicker
            side={state.side}
            selectedChar={state.selectedCharacter}
            onCharSelect={charSelectHandler}
          />
          <Character selectedChar={state.selectedCharacter} />
          <button onClick={sideHandler.bind(null, 'light')}>
            Light Side
          </button>
          <button onClick={sideHandler.bind(null, 'dark')}>Dark Side</button>
          {state.side === 'dark' && (
            <button onClick={destructionHandler}>DESTROY!</button>
          )}
        </React.Fragment>
      );
  
      if (state.destroyed) {
        content = <h1>Total destruction!</h1>;
      }
      return content;
    
  
    
}

export default App;
