const Model = require('./models');
const { Op } = require('sequelize');

// Get Aggregate Ratings
const getAggregateRatings = async (req, res, next) => {
  // Fruit in DB (can be copied from /src/comonents/fruit.json)
  const aggregateRatings = {
    bananas: {},
    cherries: {},
    green_apples: {},
    lemons: {},
    // melons: {},
    oranges: {},
    red_apples: {},
    pears: {},
    strawberries: {},
    watermelons: {},
  };

  await getCountsAndAverages();
  res.send(aggregateRatings);

  async function getCountsAndAverages() {
    for (let fruit in aggregateRatings) {
      // counts
      aggregateRatings[fruit].count = await Model.Rating.count({
        col: `${fruit}_x`,
      });
      // average
      aggregateRatings[fruit].average = {
        x:
          (await Model.Rating.sum(`${fruit}_x`)) /
          aggregateRatings[fruit].count,
        y:
          (await Model.Rating.sum(`${fruit}_y`)) /
          aggregateRatings[fruit].count,
      };
    }
  }

  return null;
};

// ADD RATINGS
const submitRatings = async (req, res, next) => {
  // Check if the user already has a session
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
