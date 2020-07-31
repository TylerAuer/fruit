import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import './Fruit.scss';

const FruitOnGraph = ({ name, ratings, setRatings, scale }) => {
  const nodeRef = useRef(null);
  const [isDraggingOverGraph, setIsDraggingOverGraph] = useState(null);
  const [isOnGraph, setIsOnGraph] = useState(!ratings[name] ? false : true);
  const src = require(`../img/${name}.svg`);

  const calculatePosition = () => {
    if (isOnGraph) {
      // Turns 0 to 100 scale into
      return {
        x: scale.x * ratings[name].x - scale.imgSize / 2,
        y: scale.y * (100 - ratings[name].y) - scale.imgSize / 2,
      };
    } else {
      return {
        x: scale.width / 2 - scale.imgSize / 2,
        y: scale.height + scale.imgSize,
      };
    }
  };

  const onStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrag = (e, position) => {
    e.preventDefault();
    e.stopPropagation();

    const newX = position.x + scale.imgSize / 2;
    const newY = position.y + scale.imgSize / 2;
    console.log(newX);
    console.log(newY);
    console.log(' ');
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
