import React, { useState, useRef } from 'react';
import useBounds from '../hooks/useBounds';
import fruitList from './Fruit.json';
import FruitOnGraph from './FruitOnGraph';
import FruitOffGraph from './FruitOffGraph';
import './Matrix.scss';

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

  // Generates fruit components **ON** the graph
  const fruitsOnGraph = Object.keys(ratings).map((name) => {
    if (!ratings[name]) {
      return null;
    }

    return (
      <FruitOnGraph
        key={name}
        name={name}
        ratings={ratings}
        setRatings={setRatings}
        scale={scale}
      />
    );
  });

  // Generates fruit components **NOT** on the graph
  const fruitsOffGraph = Object.keys(ratings).map((name) => {
    if (ratings[name]) {
      return null;
    }

    // return (
    //   <FruitOffGraph
    //     key={name}
    //     name={name}
    //     ratings={ratings}
    //     setRatings={setRatings}
    //     scale={scale}
    //   />
    // );
  });

  return (
    <>
      <div className="matrix">
        <div ref={graphRef} className="matrix__graph">
          {fruitsOnGraph}
        </div>
        <div className="matrix__unused-fruit">{fruitsOffGraph}</div>
        <div className="matrix__controls">
          <button className="app__submit">Submit</button>
        </div>
      </div>
    </>
  );
};

export default Matrix;
