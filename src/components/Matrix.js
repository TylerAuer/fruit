import React, { useState, useRef } from 'react';
import useBounds from '../hooks/useBounds';
import fruitList from './Fruit.json';
import Fruit from './Fruit';
import './Matrix.scss';

/**
 * FRUIT TO ADD IN ONCE I HAVE MADE GRAPHICS FOR THEM
  
  "kiwi": null,
  "lemons": null,
  "melon": null,
  "nectarine": null,
  "oranges": null,
  "papaya": null,
  "peaches": null,
  "pears": null,
  "pineapples": null,
  "plums": null,
  "pomegranates": null,
  "seeded_grapes": null,
  "seedless_grapes": null,
  "strawberries": null,
  "tomatoes": null,
  "blackberries": null,
  "blueberries": null,
  "grapefruits": null,
  
 */

const Matrix = () => {
  const graphRef = useRef();
  const graphBounds = useBounds(graphRef);
  const [ratings, setRatings] = useState(fruitList);

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

  // Generates fruit components
  const fruitsOnGraph = Object.keys(ratings).map((name) => {
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
          {fruitsOnGraph}
        </div>
        {/* <div className="matrix__unused-fruit" /> */}
        <div className="matrix__controls">
          <button className="app__submit">Submit</button>
        </div>
      </div>
    </>
  );
};

export default Matrix;
