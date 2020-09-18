import React, { useEffect, useState } from 'react';
import PercentileDisplay from './PercentileDisplay';
import roundRatings from '../../../functions/roundRatings';
import cleanName from '../../../functions/cleanFruitName';
import './PercentileDisplay.scss';

const UserPercentiles = ({ ratings }) => {
  const [percentiles, setPercentiles] = useState(null);

  useEffect(() => {
    // ABORTS fetch request if user hasn't rated any fruit
    const listOfRatedFruits = Object.keys(ratings).filter((name) => {
      return ratings[name];
    });

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

  const listOfPercentileDisplays = Object.keys(percentiles).map((fruitName) => (
    <div key={fruitName} className="chart">
      <div className="chart__header">
        <h3 className="chart__title">
          Your{' '}
          <img
            className="chart__fruit-img-in-title"
            src={require(`../../../img/${fruitName}.min.svg`)}
            alt={cleanName(fruitName)}
          />
          Ratings Vs Others
        </h3>
        <div className="chart__subtitle">
          Shows the percentage of users who rated{' '}
          {cleanName(fruitName).toLowerCase()} more or less tasty and more or
          less easy to eat.
        </div>
      </div>
      <PercentileDisplay fruitName={fruitName} data={percentiles[fruitName]} />
    </div>
  ));

  return (
    <section className="user-percentiles">
      <h2 className="section__heading">Your Ratings Compared to Others</h2>
      <p>Some text will go here.</p>
      <div className="percentiles__container">{listOfPercentileDisplays}</div>
    </section>
  );
};

export default UserPercentiles;
