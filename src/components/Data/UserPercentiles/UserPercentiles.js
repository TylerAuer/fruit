import React, { useEffect, useState } from 'react';
import PercentileDisplay from './PercentileDisplay';
import roundRatings from '../../../shared/functions/roundRatings';
import cleanName from '../../../shared/functions/cleanFruitName';
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
            src={require(`../../../shared/img/${fruitName}.min.svg`)}
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
    <section id="percentiles" className="user-percentiles">
      <h2 className="section__heading">Your Ratings Relative To Everyone</h2>
      <p>
        When you rated the fruit, you were likely comparing each piece of fruit
        to the others. Maybe you thought that strawberries are tastier than
        coconuts. Or maybe you said that watermelon is harder to eat than
        blueberries.
      </p>
      <p>
        That approach emphasizes the differences between fruits. But, it doesn’t
        tell you how your ratings compare to the ratings of others. To see that,
        we’ll need to look at <i>everyone’s</i> data.
      </p>
      <p>
        One way data scientists compare a single data point to a{' '}
        <b>population</b> (an entire group) is by using percentiles. A{' '}
        <b>percentile</b> is different from a percent score on a test which
        represents the portion of the points you earned. Instead a percentile
        represents the percentage of a population that you are above. This
        approach is often seen on standardized tests like the SAT. If you are in
        the 70th percentile on the SAT, that doesn’t mean that you got 70% of
        the questions right, it means that you did better than 70% of test
        takers.
      </p>
      <p>
        I found your percentile for taste and ease of eating for every fruit you
        rated. You’ll see both the percentages below and above your ratings.
        With this approach, you can see how others rated fruit in comparison to{' '}
        <b>you</b> not to the axes.
      </p>
      <div className="percentiles__container">{listOfPercentileDisplays}</div>
    </section>
  );
};

export default UserPercentiles;
