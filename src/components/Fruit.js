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

  const onDrag = (e) => {
    e.preventDefault();
    return null;
  };

  const onStop = (e, position) => {
    // get position
    const newX = position.x + scale.imgSize / 2;
    const newY = position.y + scale.imgSize / 2;

    // Set rating to null if dragged off the grid
    if (newX < 0 || newX > scale.width || newY < 0 || newY > scale.height) {
      setRatings({
        ...ratings,
        [name]: null,
      });
    }

    // ELSE:
    const newXRating = (newX * 100) / scale.width;
    const newYRating = 100 - (newY * 100) / scale.height;
    console.log(newXRating, newYRating);
    //// set state in Matrix component
    setRatings({
      ...ratings,
      [name]: {
        x: newXRating,
        y: newYRating,
      },
    });
    return null;
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={calculatedPostion}
      onDrag={onDrag}
      onStop={onStop}
    >
      <div ref={nodeRef} className={`fruit fruit-${name}`}>
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
