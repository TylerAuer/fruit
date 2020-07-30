import React, { useState } from 'react';
import Draggable from 'react-draggable';
import './Fruit.scss';

const Fruit = ({ name, ratings, setRatings, scale }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    // x: scale.left + scale.x * ratings[name].x - scale.imgSize / 2,
    // y: scale.top + scale.y * (100 - ratings[name].y) - scale.imgSize / 2,
    x: scale.x * ratings[name].x - scale.imgSize / 2,
    y: scale.y * (100 - ratings[name].y) - scale.imgSize / 2,
  });

  return (
    <Draggable defaultPosition={position}>
      <div className={`fruit fruit-${name}`}>
        <div
          className="fruit__temp-div"
          style={{
            height: scale.imgSize,
            width: scale.imgSize,
          }}
        />
        <p>LEFT: {Math.round(position.x)}</p>
        <p>TOP: {Math.round(position.y)}</p>
      </div>
    </Draggable>
  );
};

export default Fruit;
