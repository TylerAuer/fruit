import React from 'react';
import { useSpring, animated } from 'react-spring';
import './Directions.scss';

const Directions = () => {
  const anim = useSpring({
    opacity: 1,
    transform: 'translate(-50%, -50%)',
    from: { opacity: 0, transform: 'translate(-50%, -30%)' },
    delay: 3000,
  });

  return (
    <animated.div style={anim} className="directions">
      Drag each fruit onto the graph to rate how tasty and easy to eat it is.
    </animated.div>
  );
};

export default Directions;
