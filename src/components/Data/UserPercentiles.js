import React, { useEffect, useState } from 'react';
import roundRatings from '../../functions/roundRatings';

const UserPercentiles = ({ ratings }) => {
  const [percentiles, setPercentiles] = useState(null);

  useEffect(() => {
    const listOfRatedFruits = Object.keys(ratings).filter((name) => {
      return ratings[name];
    });
    // ABORTS fetch request if user hasn't rated any fruit
    if (listOfRatedFruits.length === 0) {
      return;
    }

    const roundedRatings = roundRatings(ratings);
    fetch('/user-percentiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roundedRatings),
    })
      .then((res) => res.json())
      .then((data) => setPercentiles(data));
  }, [ratings]);

  if (!percentiles) {
    return null;
  }

  return (
    <section className="user-percentiles">
      <h2 className="section__heading">Your Ratings Compared to Others</h2>
    </section>
  );
};

export default UserPercentiles;
