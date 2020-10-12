import React, { useState, useEffect } from 'react';
import fruitList from '../../shared/Fruit.json';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import '../components/Toasts/Toasts.scss';

const useManageUserRatings = () => {
  const [ratings, setRatings] = useState(fruitList);

  // When the app first loads, see if the user's active session matches
  // the session IDs in the Ratings table of the database. If so, populate the
  // the ratings state with their previous ratings
  useEffect(() => {
    fetch('/previous-ratings').then((res) => {
      if (res.status === 200) {
        res.json().then((ratings) => setRatings(ratings));
        toaster.notify(
          <div className="toast__msg">
            <p>
              <b>Welcome back! We found your previous ratings!</b>
            </p>
            <p>
              Don't like your choices? If you submit changes, we'll update the
              ratings.
            </p>
          </div>,
          { duration: 6000 }
        );
      }
    });
  }, []);

  return { ratings, setRatings };
};

export default useManageUserRatings;
