// import React, { Component } from 'react';
import React, { useState } from 'react';

import CharPicker from './components/CharPicker';
import Character from './components/Character';


// class App extends Component {
const App = props => {
  // const [state, setState] = useState({
  //     // selectedCharacter: 1, // removed due to useState below
  //     // side: 'light',  // removed due to useState below
  //     // destroyed: false // removed due to useState below
  //   });

    const [destroyed, setDestroyed] = useState(false)


    // define another state, state can be a string does not have to be an obj
    const [chosenSide, setChosenSide] = useState('light')

    // define another state, state can be a number does not have to be an obj
    const [selectedCharacter, setSelectedCharacter] = useState(1)

  
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

  /// can manually setState with ...state but not the best option, can define multiple
  // states now, see top of code
  // const sideHandler = side => {    
  //   setState({ ...state, side: side });
  // };

  const sideHandler = side => {    
    setChosenSide(side);
  };

  // make functions into a const
  // remove this. from this.setState
  // charSelectHandler = event => {
  //   const charId = event.target.value;
  //   this.setState({ selectedCharacter: charId });
  // };

  // can manually setState with ...state but not the best option, can define multiple
  // states now, see top of code
  // const charSelectHandler = event => {
  //   const charId = event.target.value;
  //   setState({ ...state, selectedCharacter: charId });
  // };

  
  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };
  
  
  // make functions into a const
  // remove this. from this.setState
  // destructionHandler = () => {
  // this.setState({ destroyed: true });
  // };

  // can manually setState with ...state but not the best option, can define multiple
  // states now, see top of code
  // const destructionHandler = () => {
  //   setState({ ...state, destroyed: true });
  // };

  const destructionHandler = () => {
    setDestroyed(true);
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
  
          {/* <CharPicker
            side={state.side}
            selectedChar={state.selectedCharacter}
            onCharSelect={charSelectHandler}
          /> 
          changed because of state hooks at top
           */}

          <CharPicker
            side={chosenSide}
            selectedChar={selectedCharacter}
            onCharSelect={charSelectHandler}
          />

          <Character selectedChar={selectedCharacter} />
          <button onClick={sideHandler.bind(null, 'light')}>
            Light Side
          </button>
          <button onClick={sideHandler.bind(null, 'dark')}>Dark Side</button>
          {chosenSide === 'dark' && (
            <button onClick={destructionHandler}>DESTROY!</button>
          )}
        </React.Fragment>
      );
  
      if (destroyed) {
        content = <h1>Total destruction!</h1>;
      }
      return content;
    
  
    
}

export default App;
