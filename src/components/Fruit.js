import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import './Fruit.scss';

const FruitOnGraph = ({
  name,
  ratings,
  setRatings,
  scale,
  listOfKeysOffGraph,
}) => {
  const nodeRef = useRef(null);
  const [isDraggingOverGraph, setIsDraggingOverGraph] = useState(null);
  const [isOnGraph, setIsOnGraph] = useState(!ratings[name] ? false : true);
  const marginForOffGraphFruits = 20;
  const src = require(`../img/${name}.svg`);

  const calculatePosition = () => {
    if (isOnGraph) {
      // ON THE GRAPH
      // so convert 0 to 100 scale into pixel position
      return {
        x: scale.x * ratings[name].x - scale.imgSize / 2,
        y: scale.y * (100 - ratings[name].y) - scale.imgSize / 2,
      };
    } else {
      // OFF THE GRAPH
      // so center and space out fruit below graph
      const count = listOfKeysOffGraph.length;
      const index = listOfKeysOffGraph.indexOf(name);
      const listOffset =
        scale.width / 2 -
        (count * scale.imgSize + (count - 1) * marginForOffGraphFruits) / 2;
      return {
        //x: scale.width / 2 - scale.imgSize / 2,
        x: index * scale.imgSize + index * marginForOffGraphFruits + listOffset,
        y: -20 - scale.imgSize,
      };
    }
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

    // Set rating to null if dragged off the grid
    if (newX < 0 || newX > scale.width || newY < 0 || newY > scale.height) {
      setIsDraggingOverGraph(false);
    } else {
      setIsDraggingOverGraph(true);
    }
  };

  const onStop = (e, position) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverGraph(null);

    // Get position
    const newX = position.x + scale.imgSize / 2;
    const newY = position.y + scale.imgSize / 2;

    if (newX < 0 || newX > scale.width || newY < 0 || newY > scale.height) {
      // Dropped off of the graph
      setIsOnGraph(false);
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
      setIsOnGraph(true);
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={calculatePosition()}
      onStart={onStart}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div className="fruit" ref={nodeRef}>
        <img
          alt={name}
          src={src}
          className={`fruit__img fruit__img--${name} ${
            isDraggingOverGraph ? '' : 'fruit__img--off-graph'
          }`}
          style={{
            height: scale.imgSize,
            width: scale.imgSize,
          }}
        />
        <div className="fruit__label">{name.replace('_', ' ')}</div>
      </div>
    </Draggable>
  );
};

export default FruitOnGraph;
