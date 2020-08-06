import React from 'react';
import './DragGuides.scss';

const DragGuides = ({ scale, position, isDraggingOverGraph }) => {
  // If off graph or not dragging, return null
  if (!isDraggingOverGraph) {
    return null;
  }

  const margin = scale.imgSize;
  // Should match the styling on hover in Fruit.scss
  const yOffsetOnHover = 5;

  const axisStyles = {
    stroke: 'darkgrey',
    strokeWidth: 1,
    strokeDasharray: '20 10',
  };

  const leftGuideCoords = {
    x1: position.x + scale.imgSize / 2 - margin,
    y1: position.y + scale.imgSize / 2,
    x2: 0,
    y2: position.y + scale.imgSize / 2,
  };

  const rightGuideCoords = {
    x1: position.x + scale.imgSize / 2 + margin,
    y1: position.y + scale.imgSize / 2,
    x2: scale.width,
    y2: position.y + scale.imgSize / 2,
  };

  const topGuideCoords = {
    x1: position.x + scale.imgSize / 2,
    y1: position.y + scale.imgSize / 2 - yOffsetOnHover - margin,
    x2: position.x + scale.imgSize / 2,
    y2: 0,
  };

  const bottomGuideCoords = {
    x1: position.x + scale.imgSize / 2,
    y1: position.y + scale.imgSize / 2 - yOffsetOnHover + margin,
    x2: position.x + scale.imgSize / 2,
    y2: scale.height,
  };

  return (
    <svg className="drag" width={scale.width} height={scale.height}>
      <line {...leftGuideCoords} {...axisStyles} />
      <line {...rightGuideCoords} {...axisStyles} />
      <line {...topGuideCoords} {...axisStyles} />
      <line {...bottomGuideCoords} {...axisStyles} />
    </svg>
  );
};

export default DragGuides;
