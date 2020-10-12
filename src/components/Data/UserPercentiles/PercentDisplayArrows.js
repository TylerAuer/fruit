import React from 'react';
import './PercentileDisplay.scss';

const PercentDisplayArrows = ({ data, fruitName }) => {
  const config = {
    height: 350,
    width: 350,
    imgSize: 40,
  };
  const imgMargin = 3;
  const strokeWidth = 1.5;

  // Calculates the location of the fruit in the SVG
  // ~ Scales from out of 100 to out of height or width
  // ~ Adjusts up and left so the center of the image lies in the correct spot
  const coords = {
    x: (data.x.below * config.height) / 100 - config.imgSize / 2,
    y: (data.y.above * config.width) / 100 - config.imgSize / 2,
  };

  // Used to determine when an arrow or its label is NOT shown. This avoids
  // arrows and labels colliding or being so short that they look bad
  // A value of 10, for example, means that the text/arrow will not display
  // unless the percentage it represents is greater than 10
  const cutoffs = {
    x: {
      arrows: 10,
      text: 50,
    },
    y: {
      arrows: 10,
      text: 15,
    },
  };

  // Used to decide which side of an arrow to place a label on
  const isOnLeft = data.x.below < 50;

  return (
    <svg
      className="percentiles__arrows"
      preserveAspectRatio="xMinYMin meet"
      viewBox={`0 0 ${config.width} ${config.height}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          fill="black"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
      <image
        className="percentiles__img"
        alt={fruitName}
        href={require(`../../../shared/img/${fruitName}.min.svg`)}
        x={coords.x}
        y={coords.y}
        height={config.imgSize}
        width={config.imgSize}
      />
      {/* 
        ///////////////
        // Arrows
        ///////////////
       */}
      {/* Above */}
      {data.y.above > cutoffs.y.arrows && (
        <line
          x1={coords.x + config.imgSize / 2}
          y1={0}
          x2={coords.x + config.imgSize / 2}
          y2={coords.y - imgMargin}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={strokeWidth}
        />
      )}
      {/* Below */}
      {data.y.below > cutoffs.y.arrows && (
        <line
          x1={coords.x + config.imgSize / 2}
          y1={config.height}
          x2={coords.x + config.imgSize / 2}
          y2={coords.y + config.imgSize + imgMargin}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={strokeWidth}
        />
      )}
      {/* Left */}
      {data.x.below > cutoffs.x.arrows && (
        <line
          x1={0}
          y1={coords.y + config.imgSize / 2}
          x2={coords.x - imgMargin}
          y2={coords.y + config.imgSize / 2}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={strokeWidth}
        />
      )}
      {/* Right */}
      {data.x.above > cutoffs.x.arrows && (
        <line
          x1={config.width}
          y1={coords.y + config.imgSize / 2}
          x2={coords.x + config.imgSize + imgMargin}
          y2={coords.y + config.imgSize / 2}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={strokeWidth}
        />
      )}
      {/* 
        ///////////////
        // LABELS
        ///////////////
       */}
      {/* ABOVE */}
      {data.y.above > cutoffs.y.text && (
        <text
          x={coords.x + config.imgSize / 2 + (isOnLeft ? 8 : -8)}
          y={0}
          dominantBaseline="middle"
          textAnchor={isOnLeft ? 'start' : 'end'}
          className="percentiles__arrow-label percentiles__arrow-label--above"
        >
          {`${data.y.above}% said tastier`}
        </text>
      )}
      {/* BELOW */}
      {data.y.below > cutoffs.y.text && (
        <text
          x={coords.x + config.imgSize / 2 + (isOnLeft ? 10 : -10)}
          y={config.height}
          dominantBaseline="middle"
          textAnchor={isOnLeft ? 'start' : 'end'}
          className="percentiles__arrow-label percentiles__arrow-label--below"
        >
          {`${data.y.below}% said less tasty`}
        </text>
      )}
      {/* LEFT */}
      {data.x.below > cutoffs.x.text && (
        <text
          x={0}
          y={coords.y + config.imgSize}
          textAnchor="start"
          dominantBaseline="middle"
          className="percentiles__arrow-label percentiles__arrow-label--left"
        >
          {`${data.x.below}% said harder`}
        </text>
      )}
      {/* RIGHT */}

      {data.x.above > cutoffs.x.text && (
        <text
          x={config.width}
          y={coords.y}
          textAnchor="end"
          dominantBaseline="middle"
          className="percentiles__arrow-label percentiles__arrow-label--right"
        >
          {`${data.x.above}% said easier`}
        </text>
      )}
    </svg>
  );
};

export default PercentDisplayArrows;
