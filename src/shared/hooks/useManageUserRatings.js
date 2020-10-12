import { useState, useEffect } from 'react';
import fruitList from '../../shared/Fruit.json';

const useManageUserRatings = () => {
  const [ratings, setRatings] = useState(fruitList);
  const [foundPreviousRatings, setFoundPreviousRatings] = useState(false);

  // When the app first loads, see if the user's active session matches
  // the session IDs in the Ratings table of the database. If so, populate the
  // the ratings state with their previous ratings
  useEffect(() => {
    fetch('/previous-ratings').then((res) => {
      if (res.status === 200) {
        res.json().then((ratings) => setRatings(ratings));
        setFoundPreviousRatings(true);
      }
    });
  }, []);

  return { ratings, setRatings, foundPreviousRatings };
};

export default useManageUserRatings;
