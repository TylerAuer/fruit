import React, { useState, useRef } from 'react';
import useBounds from '../hooks/useBounds';
import Fruit from './Fruit';
import './Matrix.scss';

const Matrix = () => {
  const graphRef = useRef();
  const graphBounds = useBounds(graphRef);
  const [ratings, setRatings] = useState({
    banana: null,
    blackberries: null,
    blueberries: null,
    cherries: null,
    grapefruits: null,
    green_apples: null,
    kiwi: null,
    lemons: null,
    melon: null,
    nectarine: null,
    oranges: null,
    papaya: null,
    peaches: null,
    pears: null,
    pineapples: null,
    plums: null,
    pomegranates: null,
    red_apples: {
      x: 50,
      y: 50,
    },
    seeded_grapes: null,
    seedless_grapes: null,
    strawberries: null,
    tomatoes: null,
    watermelons: null,
  });

  if (!graphBounds) {
    return <div ref={graphRef} className="matrix__graph" />;
  }

  const scale = graphBounds
    ? {
        width: graphBounds.width,
        height: graphBounds.height,
        left: graphBounds.left,
        top: graphBounds.top,
        x: graphBounds.width / 100,
        y: graphBounds.height / 100,
        imgSize: graphBounds.width * 0.035, // size of image as % of graph width
      }
    : null;

  // Generates fruit components for each key in ratings
  const fruits = Object.keys(ratings).map((name) => {
    if (!ratings[name]) {
      return null;
    }

    return (
      <Fruit
        key={name}
        name={name}
        ratings={ratings}
        setRatings={setRatings}
        scale={scale}
      />
    );
  });

  return (
    <>
      <div className="matrix">
        <div ref={graphRef} className="matrix__graph">
          {fruits}
        </div>
        <div className="matrix__unused-fruit" />
        <div className="matrix__controls">
          <button className="app__submit">Submit</button>
        </div>
      </div>
    </>
  );
};

export default Matrix;
