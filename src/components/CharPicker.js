// import React, { Component } from 'react'; // going to useState instead
import React, { useState, useEffect } from 'react';
import './CharPicker.css';

// paused 25:26

// convert charPicker to a functional component
const CharPicker = props => {
// class CharPicker extends Component {
  const [loadedChars, setLoadedChars] = useState([]) // list of characters
  const [isLoading, setIsLoading] = useState(false) // loading state
  // state = { characters: [], isLoading: false };

  // useEffect takes a function as an arguement
  // This function will be executed by React on every render cycle "after" 
  // this componenet has been rendered
  // **After, this is important**
  // becasue we are not calling the code in the function ourselves but 
  // we pass a function 
  // and React React will execute a function for us after the render cycle
  // has finished for this component
  // so that sounds like component did mount which also executed after
  // if you need a willmount just put another useEffect code above
  // you useEffect code as they execute in order
  // useEffect runs more often than componentDidMount, you can control it though


  useEffect(() => {
    // console.log('It works');
      // this.setState({ isLoading: true });
      setIsLoading(true);
    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);
        // setIsLoading fase because we are done
        setIsLoading(false);
        // setloadedChars to what was in this.setState
        setLoadedChars(
          selectedCharacters.map((char, index) => ({
              name: char.name,
              id: index + 1
            }))
          );
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  });

  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   fetch('https://swapi.co/api/people')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch.');
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const selectedCharacters = charData.results.slice(0, 5);
  //       this.setState({
  //         characters: selectedCharacters.map((char, index) => ({
  //           name: char.name,
  //           id: index + 1
  //         })),
  //         isLoading: false
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // render() { // removed to fix jsx code to use updated state
  // then remove all places of this.state to see how we have to adjust
  // characters now have to be adjusted from this.state.characters to loadedChars
  // convert this.props to just props because we are now in a functional component
    let content = <p>Loading characters...</p>;

    if (
      !isLoading &&
      loadedChars &&
      loadedChars.length > 0
    ) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {loadedChars.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!loadedChars || loadedChars.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content; // no render just return content
  // } // removed to fix jsx code to use updated state
}

export default CharPicker;
