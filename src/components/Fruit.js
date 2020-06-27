import React from 'react';
import Draggable from 'react-draggable';

//<Fruit name={''} img={''} location={apple} setLocation={setApple} />;

const Fruit = (props) => {
  const [location, setLocation] = React.useState({ x: 0, y: 0 });

  const onStop = (e) => {
    const x = e.layerX - e.offsetX;
    const y = e.layerY - e.offsetY;
    console.log(e);
    console.log(`x: ${x}, y:${y}`);
  };

  // Need to use DraggableCore and control the position based on state
  // Will need to figure out how to calculate the regions where the dot can be

  return (
    <Draggable
      bounds="main"
      //defaultPosition={{ x: 500, y: 500 }}
      //position={{ x: location.x, y: location.y }}
      //positionOffset={{ x: '-50%', y: '-50%' }}
      onStop={onStop}
    >
      <div className="fruit">
        <div className={`fruit__dot fruit__dot--${props.name}`}></div>
        <img src="" alt="" className="fruit__svg" />
      </div>
    </Draggable>
  );
};

export default Fruit;
