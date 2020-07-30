import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import './Fruit.scss';

const Fruit = ({ name, ratings, setRatings, scale }) => {
  const nodeRef = useRef(null);
  const src = require(`../img/${name}.png`);
  const calculatedPostion = {
    // Turns 0 to 100 scale into
    x: scale.x * ratings[name].x - scale.imgSize / 2,
    y: scale.y * (100 - ratings[name].y) - scale.imgSize / 2,
  };

  const onStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrag = (e, position) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onStop = (e, position) => {
    e.preventDefault();
    e.stopPropagation();
    // get position
    const newX = position.x + scale.imgSize / 2;
    const newY = position.y + scale.imgSize / 2;

    // Set rating to null if dragged off the grid
    if (newX < 0 || newX > scale.width || newY < 0 || newY > scale.height) {
      setRatings({
        ...ratings,
        [name]: null,
      });
    } else {
      // ELSE:
      const newXRating = (newX * 100) / scale.width;
      const newYRating = 100 - (newY * 100) / scale.height;
      //// set state in Matrix component
      setRatings({
        ...ratings,
        [name]: {
          x: newXRating,
          y: newYRating,
        },
      });
    }
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={calculatedPostion}
      onStart={onStart}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div className="fruit" ref={nodeRef}>
        <img
          alt={name}
          src={src}
          className={`fruit__img fruit__img--${name}`}
          style={{
            height: scale.imgSize,
            width: scale.imgSize,
          }}
        />
      </div>
    </Draggable>
  );
};

export default Fruit;
