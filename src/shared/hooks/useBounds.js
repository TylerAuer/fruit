import { useEffect, useState } from 'react';

const useBounds = (myRef) => {
  const [bounds, setBounds] = useState(null);
  // Triggers dimension update when window changes
  useEffect(() => {
    const getDOMRect = () => {
      // Only update bounds if on page that displays graph
      const domRect = myRef.current.getBoundingClientRect();
      setBounds(domRect);
    };

    // Needs to be called to get the dimensions when the reference first mounts
    getDOMRect();

    // Adds event listener to get new dimensions when window changes
    window.addEventListener('resize', getDOMRect);

    return () => {
      window.removeEventListener('resize', getDOMRect);
    };
  }, [myRef]);

  // References needed to convert fruit from pixel coordinates to 0 to 100
  // scale and back as well as correctly place items
  const scale = bounds
    ? {
        width: bounds.width,
        height: bounds.height,
        left: bounds.left,
        top: bounds.top,
        x: bounds.width / 100,
        y: bounds.height / 100,
        imgSize:
          bounds.width < 550 ? bounds.width * 0.048 : bounds.width * 0.05, // size of image as % of graph width
      }
    : null;

  return scale;
};

export default useBounds;
