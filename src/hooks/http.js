// this file created to add hooks in conversion
// paused at 47:51
import {  useState, useEffect } from "react";

export const useHttp = (url) => {
    const [ isLoading, setIsLoading] = useState(false);
    // using fetchedData and setFetchedData because we want to use in different components
    // and the data may be different in each

    const [ fetchedData, setFetchedData ] = useState(null);

    // URL wont always be the same so lets set it to a hook
    // fetch('https://swapi.co/api/people')
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })

      // rename charData to Data
      .then(data => {
        // const selectedCharacters = charData.results.slice(0, 5);
        // // setIsLoading false because we are done
        // setIsLoading(false);
        // // setloadedChars to what was in this.setState
        // setLoadedChars(
        //   selectedCharacters.map((char, index) => ({
        //       name: char.name,
        //       id: index + 1
        //     }))
        //   );
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
      // return something see around 49:00
      // in this case an array but it could have been an object or something else
      return [isLoading, fetchedData]
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