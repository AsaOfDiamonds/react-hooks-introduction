// this file created to add hooks in conversion
// paused at 47:51
import {  useState, useEffect } from "react";

export const useHttp = () => {
    const [ setIsLoading, setIsLoading] = useState(false);
    // using fetchedData and setFetchedData because we want to use in different components
    // and the data may be different in each

    const [ fetchedData, setFetchedData ] = useState(null);
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
}

// taken from CharPicker.js to modify

// fetch('https://swapi.co/api/people')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch.');
//         }
//         return response.json();
//       })
//       .then(charData => {
//         const selectedCharacters = charData.results.slice(0, 5);
//         // setIsLoading fase because we are done
//         setIsLoading(false);
//         // setloadedChars to what was in this.setState
//         setLoadedChars(
//           selectedCharacters.map((char, index) => ({
//               name: char.name,
//               id: index + 1
//             }))
//           );
//       })
//       .catch(err => {
//         console.log(err);
//         setIsLoading(false);
//       });
      
     
//   }, []);