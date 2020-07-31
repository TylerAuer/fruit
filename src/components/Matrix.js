import React, { useState, useRef } from 'react';
import useBounds from '../hooks/useBounds';
import fruitList from './Fruit.json';
import Fruit from './Fruit';
import SubmitButton from './SubmitButton';
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

  // Generate an array of keys to pass to Fruit so fruits of the graph can know
  // where to be placed
  const listOfKeysOffGraph = Object.keys(ratings).filter((name) => {
    return !ratings[name];
  });

  // Generates fruit components
  const fruitsOnGraph = Object.keys(ratings).map((name) => {
    return (
      <Fruit
        key={name}
        name={name}
        ratings={ratings}
        setRatings={setRatings}
        scale={scale}
        listOfKeysOffGraph={listOfKeysOffGraph}
      />
    );
  });

  return (
    <>
      <div
        className="matrix"
        style={{
          padding: `${scale.imgSize + 50}px 10px 20px 10px`,
        }}
      >
        <div ref={graphRef} className="matrix__graph">
          {fruitsOnGraph}
        </div>
      </div>
      <SubmitButton ratings={ratings} />
    </>
  );
};

export default Matrix;
