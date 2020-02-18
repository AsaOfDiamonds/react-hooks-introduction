//pick up tutorial where I left off 50:06 for watching
// 45:30 for coding

// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import Summary from './Summary';

const Character = props =>  {
  // state = { loadedCharacter: {}, isLoading: false };
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log('Rendering...');

  // can't use shouldComponentUpdate in functional components, you can wrap
  // the entire Component in Memo, see very end with export

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== this.props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== this.props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  // add second useEffect which acts like the first one but will run again
  // when props.selectedChar changes, useEffect is essentially doing the 
  // if check on props.selectedChar for us
  // as a result we can get rid of the first useEffect as this one will
  // execute initially like the first one, but then also when props.selectedChar
  // changes

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Cleaning up...')
    };
  }, [props.selectedChar])
  // the return function in useEffect executes right before
  // useEffect runs the next time, it is a cleanup function that basically
  // runs once useEffect is done, before it runs again (like will mount)

  // if you want a unMount just add another useEffect
  useEffect(() => {
    return () => {
      console.log('component did unMount')
    };
  }, [])


  // fetchData = () => {
  const fetchData = () => {  
    console.log(
      'Sending Http request for new character with id ' +
        props.selectedChar
    );
    // this.setState({ isLoading: true });
    setIsLoading(true);
    fetch('https://swapi.co/api/people/' + props.selectedChar)
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not fetch person!');
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color
          },
          gender: charData.gender,
          movieCount: charData.films.length
        };
      //   this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
      // })
      setIsLoading(false);
      setLoadedCharacter(loadedCharacter);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }  ** see how we put this in useEffect above
  // with a return function **

  // render() {
    let content = <p>Loading Character...</p>;

    // remove this.state
    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
   // }
    return content;
  }
}

export default React.memo(Character);
// memo is a method that was introduced in React 16.6
// it memoizes this component, which basically means it stores it
// and only when inputs to this component (props) change then it will
// re-render this. memo is basically shouldComponentUpdate
// if you need more control you can pass a second function, a second arguement
// which now is a function that ** has return true if the props are 
// equal so if it should not re-render and *** return false if it should
// re-render**

// export default React.memo(Character, (prevProps, nextProps) => {
// return nextProps.selectedChar === prevProps.selectedChar;
// });

// the above is redundent because React manages this perfectly for us, 
// but if you want to check it you can but you have to remember it works
// different than shouldComponentUpdate, it is the opposite 
// you return true if you DO NOT want to re-render
// you return false if you WANT it to re-render


// code before conversion
// class Character extends Component {
//   state = { loadedCharacter: {}, isLoading: false };

//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('shouldComponentUpdate');
//     return (
//       nextProps.selectedChar !== this.props.selectedChar ||
//       nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
//       nextState.isLoading !== this.state.isLoading
//     );
//   }

//   componentDidUpdate(prevProps) {
//     console.log('Component did update');
//     if (prevProps.selectedChar !== this.props.selectedChar) {
//       this.fetchData();
//     }
//   }

//   componentDidMount() {
//     this.fetchData();
//   }

//   fetchData = () => {
//     console.log(
//       'Sending Http request for new character with id ' +
//         this.props.selectedChar
//     );
//     this.setState({ isLoading: true });
//     fetch('https://swapi.co/api/people/' + this.props.selectedChar)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Could not fetch person!');
//         }
//         return response.json();
//       })
//       .then(charData => {
//         const loadedCharacter = {
//           id: this.props.selectedChar,
//           name: charData.name,
//           height: charData.height,
//           colors: {
//             hair: charData.hair_color,
//             skin: charData.skin_color
//           },
//           gender: charData.gender,
//           movieCount: charData.films.length
//         };
//         this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   componentWillUnmount() {
//     console.log('Too soon...');
//   }

//   render() {
//     let content = <p>Loading Character...</p>;

//     if (!this.state.isLoading && this.state.loadedCharacter.id) {
//       content = (
//         <Summary
//           name={this.state.loadedCharacter.name}
//           gender={this.state.loadedCharacter.gender}
//           height={this.state.loadedCharacter.height}
//           hairColor={this.state.loadedCharacter.colors.hair}
//           skinColor={this.state.loadedCharacter.colors.skin}
//           movieCount={this.state.loadedCharacter.movieCount}
//         />
//       );
//     } else if (!this.state.isLoading && !this.state.loadedCharacter.id) {
//       content = <p>Failed to fetch character.</p>;
//     }
//     return content;
//   }
// }

// export default Character;
