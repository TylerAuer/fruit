const Model = require('./models');

// Get Aggregate Ratings
const getAggregateRatings = async (req, res, next) => {
  // IF up-to-date rating in the cache --> return cache

  // ELSE generate ratings, store in cache, send back

  return null;
};

// ADD RATINGS
const submitRatings = async (req, res, next) => {
  // If user has already submitted ratings, update previous submission in DB
  // else make new row
  await addNewRatingToDB(req.body);

  function addNewRatingToDB(ratings) {
    const newRow = {};
    // If the fruit has a rating value, put it in the DB else store null
    for (let fruit in req.body) {
      if (req.body[fruit]) {
        newRow[`${fruit}_x`] = req.body[fruit].x;
        newRow[`${fruit}_y`] = req.body[fruit].y;
      } else {
        newRow[`${fruit}_x`] = null;
        newRow[`${fruit}_y`] = null;
      }
    }
    Model.Rating.create(newRow);
  }
};

module.exports = { getAggregateRatings, submitRatings };
