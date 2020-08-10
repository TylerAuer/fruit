import React, { useRef, useState } from 'react';
import Directions from './Directions';
import Fruit from './Fruit';
import Footer from './Footer';
import useBounds from '../hooks/useBounds';
import './Graph.scss';

const Graph = ({ aggregate, ratings, setRatings, submitRatings }) => {
  const graphRef = useRef();
  const scale = useBounds(graphRef);
  const [showAggregate, setShowAggregate] = useState(false);

  // Just show axis until useBounds is able to determine the info about the
  // graph that is used to correctly position all of the fruit
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
        aggregate={aggregate}
        showAggregate={showAggregate}
        scale={scale}
        listOfKeysOffGraph={listOfKeysOffGraph}
      />
    );
  });

  return (
    <main className="app">
      <Directions ratings={ratings} />
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
      <Footer
        submitRatings={submitRatings}
        setShowAggregate={setShowAggregate}
        showAggregate={showAggregate}
      />
    </main>
  );
};

export default Graph;
