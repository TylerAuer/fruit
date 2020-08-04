import React, { useState, useRef } from 'react';
import useBounds from '../hooks/useBounds';
import useManageUserRatings from '../hooks/useManageUserRatings';
import useManageAggregate from '../hooks/useManageAggregate';
import Directions from './Directions';
import Fruit from './Fruit';
import Bottom from './Bottom';
import './Matrix.scss';

/**
 * FRUIT TO ADD IN ONCE I HAVE MADE GRAPHICS FOR THEM
  
  "kiwi": null,
  "nectarine": null,
  "papaya": null,
  "peaches": null,
  "pineapples": null,
  "plums": null,
  "pomegranates": null,
  "seeded_grapes": null,
  "seedless_grapes": null,
  "tomatoes": null,
  "blackberries": null,
  "blueberries": null,
  "grapefruits": null,
  
 */

const App = () => {
  const graphRef = useRef();
  const scale = useBounds(graphRef);
  const { ratings, setRatings, submitRatings } = useManageUserRatings();
  const { aggregate, getAggregate } = useManageAggregate();
  const [showAggregate, setShowAggregate] = useState(false);

  // Just show axis until useBounds is able to determine that info
  if (!scale) {
    return <div ref={graphRef} className="matrix__graph" />;
  }

  // Generates an array of fruit that are OFF the graph.
  // Needed to display fruit spaced out nicely above graph
  const listOfKeysOffGraph = Object.keys(ratings).filter((name) => {
    return !ratings[name];
  });

  // Generate fruit components
  const fruit = Object.keys(ratings).map((name) => {
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
      <main className="app">
        <Directions />
        <div
          className="matrix"
          style={{
            padding: `${scale.imgSize + 30}px 10px 20px 10px`,
          }}
        >
          <div ref={graphRef} className="matrix__graph">
            {fruit}
          </div>
        </div>
      </main>
      <Bottom
        submitRatings={submitRatings}
        setShowAggregate={setShowAggregate}
        showAggregate={showAggregate}
      />
    </>
  );
};

export default App;
