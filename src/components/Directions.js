import React from 'react';
import './Directions.scss';

const Directions = ({ ratings }) => {
  let noFruitRated = true;
  Object.keys(ratings).forEach((fruit) => {
    if (ratings[fruit]) {
      noFruitRated = false;
    }
  });

  return (
    <div className={`directions ${noFruitRated ? '' : 'directions--hidden'}`}>
      Drag the fruit onto the graph to rate how tasty and easy to eat they are.
    </div>
  );
};

export default Directions;
