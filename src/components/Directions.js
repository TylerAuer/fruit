import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './Directions.scss';
//import Delayer from './Delayer';

const Directions = ({ listOfKeysOffGraph }) => {
  const [showDirs, setShowDirs] = useState(true);

  useEffect(() => {
    if (listOfKeysOffGraph.length !== 16) {
      setShowDirs(false);
    }
  }, [listOfKeysOffGraph]);

  const anim = useSpring({
    opacity: 1,
    transform: 'translate(-50%, -50%)',
    from: { opacity: 0, transform: 'translate(-50%, -30%)' },
    delay: 3000,
  });

  const Dirs = (
    <animated.div style={anim} className="directions">
      Drag each fruit onto the axis to rate how tasty and easy to eat it is.
    </animated.div>
  );

  return showDirs ? Dirs : null;
};

export default Directions;
