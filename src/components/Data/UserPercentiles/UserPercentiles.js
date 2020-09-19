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
          <img
            className="chart__fruit-img-in-title"
            src={require(`../../../img/${fruitName}.min.svg`)}
            alt={cleanName(fruitName)}
          />
          {cleanName(fruitName)}
        </h3>
        <div className="chart__subtitle">
          Percentage of users who rated {cleanName(fruitName).toLowerCase()}{' '}
          more or less tasty and more or less easy to eat than you.
        </div>
      </div>
      <PercentileDisplay fruitName={fruitName} data={percentiles[fruitName]} />
    </div>
  ));

  return (
    <section className="user-percentiles">
      <h2 className="section__heading">
        Your Ratings Relative To Everyone Else
      </h2>
      <p>
        One way to analyze the data is to see how your ratings compare to
        everyone else's ratings. Maybe you rated strawberries as tasty, but lots
        of people rated strawberries as <i>REALLY</i> tasty. That sort of
        difference only shows up when we compare your ratings to everyone's
        ratings. This helps us know if your ratings are typical or atypical.
      </p>
      <p>
        One way of describing how your ratings compare to the population
        (everyone who has rated fruit) is using percentages. We can look at the
        percentage of people who rated fruit above or below you in taste and
        ease of eating.
      </p>
      <div className="percentiles__container">{listOfPercentileDisplays}</div>
    </section>
  );
};

export default UserPercentiles;
