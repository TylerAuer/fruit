import React from 'react';
import './DragGuides.scss';

const DragGuides = ({ scale, position, isDraggingOverGraph }) => {
  // If off graph or not dragging, return null
  if (!isDraggingOverGraph) {
    return null;
  }

  const axisStyles = {
    stroke: 'darkgrey',
    strokeWidth: 1,
    strokeDasharray: '20 10',
  };

  const edgeStyles = {
    stroke: 'black',
    strokeWidth: 5,
    strokeDasharray: '20 10',
  };

  // Adds space so guides don't touch the fruit
  const margin = scale.imgSize;
  // Should match the styling on hover in Fruit.scss
  const yOffsetOnHover = 5;
  // How close to the edge before triggering edgeGuides
  const edgeDistTrigger = 50;

  const guideCoords = {
    left: {
      x1: position.x + scale.imgSize / 2 - margin,
      y1: position.y + scale.imgSize / 2,
      x2: 0,
      y2: position.y + scale.imgSize / 2,
    },
    right: {
      x1: position.x + scale.imgSize / 2 + margin,
      y1: position.y + scale.imgSize / 2,
      x2: scale.width,
      y2: position.y + scale.imgSize / 2,
    },
    top: {
      x1: position.x + scale.imgSize / 2,
      y1: position.y + scale.imgSize / 2 - yOffsetOnHover - margin,
      x2: position.x + scale.imgSize / 2,
      y2: 0,
    },
    bottom: {
      x1: position.x + scale.imgSize / 2,
      y1: position.y + scale.imgSize / 2 - yOffsetOnHover + margin,
      x2: position.x + scale.imgSize / 2,
      y2: scale.height,
    },
    leftEdge: {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: scale.height,
    },
    rightEdge: {
      x1: scale.width,
      y1: 0,
      x2: scale.width,
      y2: scale.height,
    },
    topEdge: {
      x1: 0,
      y1: 0,
      x2: scale.width,
      y2: 0,
    },
    bottomEdge: {
      x1: 0,
      y1: scale.height,
      x2: scale.width,
      y2: scale.height,
    },
  };

  return (
    <svg
      className="drag"
      width={scale.width}
      height={scale.height}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line {...guideCoords.left} {...axisStyles} />
      <line {...guideCoords.right} {...axisStyles} />
      <line {...guideCoords.top} {...axisStyles} />
      <line {...guideCoords.bottom} {...axisStyles} />
      {position.x + scale.imgSize / 2 < edgeDistTrigger && (
        <line {...guideCoords.leftEdge} {...edgeStyles} />
      )}
      {scale.width - (position.x + scale.imgSize / 2) < edgeDistTrigger && (
        <line {...guideCoords.rightEdge} {...edgeStyles} />
      )}
      {position.y + scale.imgSize / 2 < edgeDistTrigger && (
        <line {...guideCoords.topEdge} {...edgeStyles} />
      )}
      {scale.height - (position.y + scale.imgSize / 2) < edgeDistTrigger && (
        <line {...guideCoords.bottomEdge} {...edgeStyles} />
      )}
    </svg>
  );
};

export default DragGuides;
