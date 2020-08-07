import React from 'react';
import './AggregateArrows.scss';

// scale = { scale };
// userPosition = { userPosition };
// aggregatePosition = { aggregatePosition };
// isOnGraph = { isOnGraph };
// showAggregate = { showAggregate };

const AggregateArrows = ({
  scale,
  userPosition,
  aggregatePosition,
  isOnGraph,
  showAggregate,
  src,
  name,
}) => {
  // Hide arrows if not showing aggregate or if off graph
  if (!showAggregate || !isOnGraph) {
    return null;
  }

  // Shortens the line so arrow is not behind the the fruit img
  // Uses similar triangles by finding the proportion of the hypotenuse length
  // to the hypotenuse - 1/2 the image size. This proportion is then used
  // to adjust the x and y coordinates respectively while also adjusting
  // for the fact that the position normally refers to the top left corner
  const x1 = aggregatePosition.x + scale.imgSize;
  const y1 = aggregatePosition.y + scale.imgSize;
  const x2 = userPosition.x + scale.imgSize;
  const y2 = userPosition.y + scale.imgSize;
  const distFromUserToAgg = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  // Dividing by 1.3 leaves an appropriate amount of room between the fruit and
  // the arrow
  const scaleFactor =
    (distFromUserToAgg - scale.imgSize / 1.3) / distFromUserToAgg;
  const xShortened = (x1 - x2) * scaleFactor;
  const yShortened = (y1 - y2) * scaleFactor;

  // If the distance between the user's position and the aggregate position
  // is too small, the look is bad and sometimes incorrect due to negative
  // distances. So, this sets a limit on the smallest possible distance
  const showArrow = distFromUserToAgg > 1.6 * scale.imgSize;

  return (
    <>
      <img
        alt={`${name} ghost`}
        draggable="false" // only applies when showing aggregates
        src={src}
        className="ghost"
        style={{
          height: scale.imgSize,
          width: scale.imgSize,
          transform: `translate(${userPosition.x}px, ${userPosition.y}px)`,
        }}
      />
      {showArrow && (
        <svg
          className="arrow"
          width={scale.width}
          height={scale.height}
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
          <line
            x1={userPosition.x + xShortened + scale.imgSize / 2}
            y1={userPosition.y + yShortened + scale.imgSize / 2}
            x2={aggregatePosition.x - xShortened + scale.imgSize / 2}
            y2={aggregatePosition.y - yShortened + scale.imgSize / 2}
            markerStart="url(#arrow)"
            stroke="black"
            strokeWidth={1}
          />
        </svg>
      )}
    </>
  );
};

export default AggregateArrows;
