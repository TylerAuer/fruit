import { useState, useEffect } from 'react';
import fruitList from '../components/Fruit.json';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import '../components/Toasts.scss';

const useManageUserRatings = () => {
  const [ratings, setRatings] = useState(fruitList);

  console.log('Rendered', fruitList);
  useEffect(() => {
    // When the app first loads, see if the user's active session matches
    // the session IDs in the Ratings table of the database. If so, populate the
    // the ratings state with their previous ratings
    fetch('/previous-ratings').then((res) => {
      if (res.status === 200) {
        res.json().then((ratings) => setRatings(ratings));
        toaster.notify(
          "Welcome back! We found your previous ratings. Don't like your choices? If you submit changes, we'll update your previous submission.",
          { duration: 8000 }
        );
      }
    });
  }, []);

  const submitRatings = () => {
    const roundToTenths = (float) => {
      return Math.round(float * 10) / 10;
    };

    // round data to one decimal place
    const roundedRatings = { ...ratings };
    Object.keys(roundedRatings).forEach((fruit) => {
      // Check if not null
      if (roundedRatings[fruit]) {
        roundedRatings[fruit].x = roundToTenths(roundedRatings[fruit].x);
        roundedRatings[fruit].y = roundToTenths(roundedRatings[fruit].y);
      }
    });

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roundedRatings),
    })
      .then((res) => res.text())
      .then((message) => toaster.notify(message))
      .catch((error) => {
        toaster.notify('So sorry! There was an error submiting your ratings.');
        console.log(error);
      });
  };

  return { ratings, setRatings, submitRatings };
};

export default useManageUserRatings;
