import React from 'react';
import PercentDisplayArrows from './PercentDisplayArrows';
import './PercentileDisplay.scss';

const PercentileDisplay = ({ fruitName, data }) => {
  const config = {
    height: 350,
    width: 350,
    imgSize: 40,
  };

  // Fruit are positioned proportionally based on the percentiles
  // This positioning depends on a variety of variables
  // so that info computed here
  const graphStyle = {
    height: `${config.height}px`,
    width: `${config.width}px`,
  };

  const coords = {
    x: (data.x.below * config.height) / 100 - config.imgSize / 2,
    y: (data.y.above * config.width) / 100 - config.imgSize / 2,
  };

  const imgStyle = {
    top: coords.y,
    left: coords.x,
    width: `${config.imgSize}px`,
    height: 'auto',
  };

  return (
    <div className={`percentiles__single ${fruitName}`}>
      <div style={graphStyle} className="percentiles__graph">
        <img
          className="percentiles__img"
          alt={fruitName}
          src={require(`../../../img/${fruitName}.min.svg`)}
          style={imgStyle}
        />
        <PercentDisplayArrows config={config} data={data} coords={coords} />
      </div>
    </div>
  );
};

export default PercentileDisplay;
