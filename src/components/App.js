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
  const graphBounds = useBounds(graphRef);
  const { ratings, setRatings, submitRatings } = useManageUserRatings();
  const { aggregate, getAggregate } = useManageAggregate();
  const [showAggregate, setShowAggregate] = useState(false);

  // The useBounds hook takes time on page load to get info
  // so, only show axis until useBounds gets its data
  if (!graphBounds) {
    return <div ref={graphRef} className="matrix__graph" />;
  }

  // References needed to convert fruit from pixel coordinates to 0 to 100
  // scale and back as well as correctly place items
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

  // Generates an array of fruit that are OFF the graph.
  // Needed to display fruit spaced out nicely above graph
  const listOfKeysOffGraph = Object.keys(ratings).filter((name) => {
    return !ratings[name];
  });

  //
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
      <Bottom submitRatings={submitRatings} getAggregate={getAggregate} />
    </>
  );
};

export default App;
