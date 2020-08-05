const Model = require('./models');
const NodeCache = require('node-cache');
const chalk = require('chalk');
const log = console.log;

//
//
// INITIALIZE THE CACHE
//
// Currently, the cache is cleared whenever a user submits data. This option
// seems best at first because users will immediatelly see their input affect
// the aggregate.
//
// Once the DB grows or the site becomes popular the cache can clear after a
// certain amount of time, but a new submission will not empty the cache.
//
const cache = new NodeCache({
  stdTTL: 0, // never delete cached values
});

//
//
// HANDLE REQUESTS FOR AGGREGATE DATA
//
//
const sendAggregateDataToUser = async (req, res) => {
  // If the data is already in the cache, send it
  if (cache.has('aggregate')) {
    log(chalk.magenta.bold('AGGREGATE: ') + chalk.magenta('Sent cached data.'));
    res.send(cache.get('aggregate'));
    return;
  }

  // Generate new aggregate ratings
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
        x_avg: sumOfX / count,
        y_avg: sumOfY / count,
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

//
//
// HANDLE USER SUBMISSIONS OF RATINGS
//
//
const storeOrUpdateUserRatings = async (req, res) => {
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
    res.send("We've updated your previous ratings in our dataset.");
  } else {
    Model.Rating.create(ratingsForDB);
    log(chalk.blue.bold('RATING: ') + chalk.blue('Recording new ratings'));
    res.send('Your ratings have been added to our dataset');
  }

  // Once a user submits new data, the cached aggregate data is incorrect
  // so, delete it.
  cache.del('aggregate');

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

module.exports = { sendAggregateDataToUser, storeOrUpdateUserRatings };
