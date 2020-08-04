import { useState } from 'react';
import fruitList from '../components/Fruit.json';

const useManageUserRatings = () => {
  const [ratings, setRatings] = useState(fruitList);

  const submitRatings = () => {
    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratings),
    });
  };

  return { ratings, setRatings, submitRatings };
};

export default useManageUserRatings;
