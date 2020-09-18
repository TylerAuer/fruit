import React from 'react';
import './PercentileDisplay.scss';

const PercentDisplayArrows = ({ config, data, coords }) => {
  const percentCutoff = 30;
  const cutoffs = {
    x: {
      arrows: 10,
      text: 50,
    },
    y: {
      arrows: 10,
      text: 25,
    },
  };

  const isOnLeft = data.x.below < 50;

  return (
    <svg
      className="percentiles__arrows"
      width={config.width}
      height={config.height}
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
          y2={coords.y + config.imgSize / 2}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={1}
        />
      )}
      {/* Below */}
      {data.y.below > cutoffs.y.arrows && (
        <line
          x1={coords.x + config.imgSize / 2}
          y1={config.height}
          x2={coords.x + config.imgSize / 2}
          y2={coords.y + config.imgSize / 2}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={1}
        />
      )}
      {/* Left */}
      {data.x.below > cutoffs.x.arrows && (
        <line
          x1={0}
          y1={coords.y + config.imgSize / 2}
          x2={coords.x + config.imgSize / 2}
          y2={coords.y + config.imgSize / 2}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={1}
        />
      )}
      {/* Right */}
      {data.x.above > cutoffs.x.arrows && (
        <line
          x1={config.width}
          y1={coords.y + config.imgSize / 2}
          x2={coords.x + config.imgSize / 2}
          y2={coords.y + config.imgSize / 2}
          markerStart="url(#arrow)"
          stroke="black"
          strokeWidth={1}
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
