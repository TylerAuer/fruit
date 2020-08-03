// Get Aggregate Ratings
const getAggregateRatings = (req, res, next) => {
  // IF up-to-date rating in the cache --> return cache

  // ELSE generate ratings, store in cache, send back

  return null;
};

// ADD RATINGS
const submitRatings = (req, res, next) => {
  // If user has already submitted ratings, update previous submission in DB

  // else make new row

  return null;
};

module.exports = { getAggregateRatings, submitRatings };
