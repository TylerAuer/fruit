import { useEffect, useState } from 'react';

const useResponsiveDimensions = (myRef) => {
  const [bounds, setBounds] = useState(null);

  // Triggers dimension update when window changes
  useEffect(() => {
    const getDOMRect = () => {
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

  return bounds;
};

export default useResponsiveDimensions;
