// this file created to add hooks in conversion


// **Important** you must always call hooks whether they are built in or
// my own  on the top level of the function, so not nested in another function 
  // call, not nested in a function or a for loop
import {  useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
    const [ isLoading, setIsLoading] = useState(false);
    // using fetchedData and setFetchedData because we want to use in different components
    // and the data may be different in each

    const [ fetchedData, setFetchedData ] = useState(null);

    // URL wont always be the same so lets set it to a hook
    // fetch('https://swapi.co/api/people')
    useEffect(() => {
      setIsLoading(true);
      console.log('Sending Http request to URL: ' + url);
      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(data => {
        
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
    }, dependencies);
    // fetch(url)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch.');
    //     }
    //     return response.json();
    //   })

    //   // rename charData to Data
    //   .then(data => {
    //     // const selectedCharacters = charData.results.slice(0, 5);
    //     // // setIsLoading false because we are done
    //     // setIsLoading(false);
    //     // // setloadedChars to what was in this.setState
    //     // setLoadedChars(
    //     //   selectedCharacters.map((char, index) => ({
    //     //       name: char.name,
    //     //       id: index + 1
    //     //     }))
    //     //   );
    //     setIsLoading(false);
    //     setFetchedData(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });
      // return something see around 49:00
      // in this case an array but it could have been an object or something else
      return [isLoading, fetchedData]
};

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