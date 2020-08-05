import { useState } from 'react';
import fruitList from '../components/Fruit.json';

const useManageUserRatings = () => {
  const [ratings, setRatings] = useState(fruitList);

  const submitRatings = () => {
    const roundToTenths = (float) => {
      return Math.round(float * 10) / 10;
    };

    const roundedRatings = { ...ratings };

    // round data to one decimal place
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
    });
  };

  return { ratings, setRatings, submitRatings };
};

export default useManageUserRatings;
