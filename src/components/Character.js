//pick up tutorial where I left off 50:06 for watching
// 36:25 for coding

// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import Summary from './Summary';

const Character = props =>  {
  // state = { loadedCharacter: {}, isLoading: false };
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
    console.log('fetching data')
    fetchData();
  }, [props.selectedChar])


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
  // }

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

export default Character;


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
