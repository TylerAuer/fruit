import React from 'react';

//<Fruit name={''} img={''} location={apple} setLocation={setApple} />;

const Fruit = (props) => {
  // location

  return (
    <div className="fruit">
      <div className={`fruit__dot fruit__dot--${props.name}`}></div>
      <img src="" alt="" className="fruit__svg" />
    </div>
  );
};

export default Fruit;
