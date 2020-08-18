import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import DragGuides from './DragGuides';
import AggregateArrows from './AggregateArrows';
import './Fruit.scss';

const Fruit = ({
  name,
  ratings,
  setRatings,
  scale,
  listOfKeysOffGraph,
  aggregate,
  showAggregate,
}) => {
  const nodeRef = useRef(null);
  const [isDraggingOverGraph, setIsDraggingOverGraph] = useState(null);
  const marginForOffGraphFruits = scale.imgSize * 0.25; // scales responsively
  const src = require(`../img/${name}.svg`);

  if (name === 'bananas') {
    console.log('bananas', scale);
  }
  // Use rating to determine if the fruit is currently placed on the graph
  let isOnGraph = !ratings[name] ? false : true;

  const calculateUserPosition = () => {
    // Displaying user's ratings
    if (isOnGraph) {
      // convert 0 to 100 scale into pixel position
      return {
        x: scale.x * ratings[name].x - scale.imgSize / 2,
        y: scale.y * (100 - ratings[name].y) - scale.imgSize / 2,
      };
    } else {
      // Space out fruit nicely above graph
      const count = listOfKeysOffGraph.length;
      const index = listOfKeysOffGraph.indexOf(name);
      const listOffset =
        (scale.width -
          (count * scale.imgSize + (count - 1) * marginForOffGraphFruits)) /
        2;
      return {
        x: index * scale.imgSize + index * marginForOffGraphFruits + listOffset,
        y: -20 - scale.imgSize,
      };
    }
  };

  const calculateAggregatePosition = () => {
    return {
      x: scale.x * aggregate.fruit[name].avg_x - scale.imgSize / 2,
      y: scale.y * (100 - aggregate.fruit[name].avg_y) - scale.imgSize / 2,
    };
  };

  const onStart = (e, position) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevents flash of off graph styles when fruit on graph is clicked but cursor
    // is not moved
    isOnGraph ? setIsDraggingOverGraph(true) : setIsDraggingOverGraph(true);
  };

  const onDrag = (e, position) => {
    e.preventDefault();
    e.stopPropagation();

    const newX = position.x + scale.imgSize / 2;
    const newY = position.y + scale.imgSize / 2;

    // Track whether the drag is on or over the graph so styles can be applied
    if (newX < 0 || newX > scale.width || newY < 0 || newY > scale.height) {
      setIsDraggingOverGraph(false);
    } else {
      setIsDraggingOverGraph(true);
    }

    if (newX < 0 || newX > scale.width || newY < 0 || newY > scale.height) {
      // Dropped off of the graph
      setRatings({
        ...ratings,
        [name]: null,
      });
    } else {
      // Dropped on the graph
      const newXRating = (newX * 100) / scale.width;
      const newYRating = 100 - (newY * 100) / scale.height;
      setRatings({
        ...ratings,
        [name]: {
          x: newXRating,
          y: newYRating,
        },
      });
    }
  };

  const onStop = (e, position) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverGraph(null);
  };

  const userPosition = calculateUserPosition();
  const aggregatePosition = showAggregate ? calculateAggregatePosition() : null;

  return (
    <>
      <Draggable
        nodeRef={nodeRef}
        position={showAggregate ? aggregatePosition : userPosition}
        onStart={onStart}
        onDrag={onDrag}
        onStop={onStop}
        cancel=".fruit__label"
        disabled={showAggregate ? true : false} // can't drag aggregate fruit
      >
        <div
          className={`fruit ${
            isDraggingOverGraph === null ? '' : 'fruit--drag'
          }`}
          ref={nodeRef}
        >
          <img
            alt={name}
            draggable="false" // only applies when showing aggregates
            src={src}
            className={`fruit__img fruit__img--${name} ${
              isDraggingOverGraph ? '' : 'fruit__img--off-graph'
            } ${showAggregate ? 'fruit__img--aggregate' : ''}
          `}
            style={{
              height: scale.imgSize,
              width: scale.imgSize,
            }}
          />
          <div className="fruit__label">{name.replace('_', ' ')}</div>
        </div>
      </Draggable>
      <DragGuides
        scale={scale}
        isDraggingOverGraph={isDraggingOverGraph}
        position={userPosition}
      />
      <AggregateArrows
        scale={scale}
        userPosition={userPosition}
        aggregatePosition={aggregatePosition}
        isOnGraph={isOnGraph}
        showAggregate={showAggregate}
        src={src}
        name={name}
      />
    </>
  );
};

export default Fruit;
