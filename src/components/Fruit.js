import React, { useState } from 'react';
import './Fruit.scss';

const Fruit = ({ name, ratings, setRatings, scale }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: scale.left + scale.x * ratings[name].x - scale.imgSize / 2,
    y: scale.top + scale.y * (100 - ratings[name].y) - scale.imgSize / 2,
  });

  return (
    <div
      className={`fruit fruit-${name}`}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <div
        className="fruit__temp-div"
        style={{
          height: scale.imgSize,
          width: scale.imgSize,
        }}
      />
      <p>TOP: {Math.round(position.y)}</p>
      <p>LEFT: {Math.round(position.x)}</p>
    </div>
  );
};

export default Fruit;
