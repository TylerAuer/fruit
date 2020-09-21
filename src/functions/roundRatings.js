const roundRatings = (ratings) => {
  const roundToTenths = (float) => {
    return Math.round(float * 10) / 10;
  };

  // round data to one decimal place
  const roundedRatings = { ...ratings };
  Object.keys(roundedRatings).forEach((fruit) => {
    // Check if not null
    if (roundedRatings[fruit]) {
      roundedRatings[fruit].x = roundToTenths(roundedRatings[fruit].x);
      roundedRatings[fruit].y = roundToTenths(roundedRatings[fruit].y);
    }
  });

  return roundedRatings;
};

export default roundRatings;
