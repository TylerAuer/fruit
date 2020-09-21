import React from 'react';
import PercentDisplayArrows from './PercentDisplayArrows';
import './PercentileDisplay.scss';

const PercentileDisplay = ({ fruitName, data }) => {
  // Fruit are positioned proportionally based on the percentiles
  // This positioning depends on a variety of variables
  // so that info computed here

  return (
    <div className={`percentiles__single ${fruitName}`}>
      <div className="percentiles__graph">
        <PercentDisplayArrows fruitName={fruitName} data={data} />
      </div>
    </div>
  );
};

export default PercentileDisplay;
