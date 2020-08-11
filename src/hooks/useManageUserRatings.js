import { useState } from 'react';
import fruitList from '../components/Fruit.json';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import '../components/Toasts.scss';

const useManageUserRatings = () => {
  // TODO: Populate the matrix with previous user ratings if the user
  // has an active sessions
  const [ratings, setRatings] = useState(fruitList);

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
