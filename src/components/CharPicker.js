// import React, { Component } from 'react'; // going to useState instead
// import React, { useState, useEffect } from 'react';
import React from 'react';
import { useHttp } from "../hooks/http";
import './CharPicker.css';



// paused 51:14

// convert charPicker to a functional component
const CharPicker = props => {
// class CharPicker extends Component {
  // const [loadedChars, setLoadedChars] = useState([]) // list of characters -- now done with hook
  // const [isLoading, setIsLoading] = useState(false) // loading state -- now done with hook
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

  // **Important** you must always call hooks whether they are built in or
  // my own  on the top level of the function, so not nested in another function 
  // call, not nested in a function or a for loop
  const [isLoading, fetchedData ] = useHttp('https://swapi.co/api/people', []);

  const selectedCharacters = fetchedData 
    ? fetchedData.results
      .slice(0, 5)
      .map((char, index) => ({
        name: char.name,
        id: index + 1
      }))
    : [];
  
      
  // new useEffect would be as below
  // useEffect(() => {
  //   console.log('useEffect runs');

  //   // using useHttp() is not allowed here must put it above
  // }, [])


  // old useEffect below
  // useEffect(() => {
  //   // console.log('It works');
  //     // this.setState({ isLoading: true });
  //     setIsLoading(true);
  //   fetch('https://swapi.co/api/people')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch.');
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       const selectedCharacters = charData.results.slice(0, 5);
  //       // setIsLoading fase because we are done
  //       setIsLoading(false);
  //       // setloadedChars to what was in this.setState
  //       setLoadedChars(
  //         selectedCharacters.map((char, index) => ({
  //             name: char.name,
  //             id: index + 1
  //           }))
  //         );
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  //     // useEffect takes 2 arguements, it does not only take a function
  //     // which should execute after every render cycle
  //     // the second arguement is an array of dependancies of that function we passed to useEffect
  //     // so basicly an array where we have to state all variables that we use inside of that function
  //     // we want to pass to useEffect, that should bascialy decide if that runs again or not
  //     // so anything that we pass to that array, if we pass a variable here (second arguement), 
  //     // that means if that
  //     // variables value changes then the function that was passed to useEffect should run again
  //     // if we pass an empty array as the second arguement then you are basicly saying hey React
  //     // whenever this data which I pass to you here which is an empty array, when that changes please 
  //     // run that function I passed to you again. It will always run the first time but because of the 
  //     // empty array - subsequent executions are basically blocked because if we pass an empty array here
  //     // there is no data that changes, therfore data never changes and it never re-executes
  //     // ** useEffect with an empty array as a second arguementis the equivalent to component didMount** 
  // }, []);

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
      selectedCharacters &&
      selectedCharacters.length > 0) {
      content = (
        <select
          onChange={props.onCharSelect}
          value={props.selectedChar}
          className={props.side}
        >
          {selectedCharacters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !isLoading &&
      (!selectedCharacters || selectedCharacters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content; // no render just return content
  // } // removed to fix jsx code to use updated state
};

export default CharPicker;
