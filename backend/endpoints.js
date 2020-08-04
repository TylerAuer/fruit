const Model = require('./models');
const NodeCache = require('node-cache');
const chalk = require('chalk');
const log = console.log;

// Set up cache
const cache = new NodeCache({
  stdTTL: 20, // delete cached values after 10 seconds
});

// Get Aggregate Ratings
const getAggregateRatings = async (req, res) => {
  const cacheHasAggregate = cache.has('aggregate');
  if (cacheHasAggregate) {
    log(chalk.magenta.bold('AGGREGATE: ') + chalk.magenta('Sent cached data.'));
    res.send(cache.get('aggregate'));
    return;
  }

  // Fruit in DB (can be copied from /src/comonents/fruit.json)
  const aggregateRatings = {
    count_of_submissions: await getTotalSubmissions(),
    fruit: {
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
    },
  };

  await getCountsAndAveragesByFruitDimension();

  async function getCountsAndAveragesByFruitDimension() {
    let count_of_all_ratings = 0;
    for (let fruit in aggregateRatings.fruit) {
      const count = await Model.Rating.count({
        col: `${fruit}_x`,
      });
      const sumOfX = await Model.Rating.sum(`${fruit}_x`);
      const sumOfY = await Model.Rating.sum(`${fruit}_y`);
      count_of_all_ratings += count;
      aggregateRatings.fruit[fruit] = {
        count: count,
        xAvg: sumOfX / count,
        yAvg: sumOfY / count,
      };
    }
    aggregateRatings.count_of_all_ratings = count_of_all_ratings;
  }

  function getTotalSubmissions() {
    return Model.Rating.count();
  }

  res.send(aggregateRatings);
  cache.set('aggregate', aggregateRatings);
  log(
    chalk.magenta.bold('AGGREGATE: ') +
      chalk.magenta('Caching and send aggregate data')
  );
};

// Handle a user submitting ratings
const submitRatings = async (req, res) => {
  const ratingsForDB = await prepDataForDB(req.body);
  const userPreviouslySubmittedRatings = (await Model.Rating.findOne({
    where: {
      session_id: req.sessionID,
    },
  }))
    ? true
    : false;

  if (userPreviouslySubmittedRatings) {
    Model.Rating.update(ratingsForDB, {
      where: {
        session_id: req.sessionID,
      },
    });
    log(chalk.blue.bold('RATING: ') + chalk.blue('Updating set of ratings'));
  } else {
    Model.Rating.create(ratingsForDB);
    log(chalk.blue.bold('RATING: ') + chalk.blue('Recording new ratings'));
  }

  function prepDataForDB(ratings) {
    const newRow = {
      session_id: req.sessionID,
    };
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
    return newRow;
  }
};

module.exports = { getAggregateRatings, submitRatings };
