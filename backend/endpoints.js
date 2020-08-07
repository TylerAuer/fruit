const Model = require('./models');
const NodeCache = require('node-cache');
const chalk = require('chalk');
const { sequelize } = require('./models');
const log = console.log;

//
//
// INITIALIZE THE CACHE
//
// Currently, when a user submits ratings the cache is deleted. This is not
// a good long-term plan for production
//
//
const cache = new NodeCache({
  stdTTL: 60 * 1, // delete cached items after 1 minute
  checkperiod: 30, // check if cache should be deleted every 1 minute
});

//
//
// HANDLE REQUESTS FOR AGGREGATE DATA
//
// If there is a aggregate data in the cache, then it sends it to user.
// Otherwise, it generates new aggregate, stores it in the cache, and sends
// it to the user.
//
//
const sendAggregateDataToUser = async (req, res) => {
  if (cache.has('aggregate')) {
    res.send(cache.get('aggregate'));
  } else {
    res.send(await calculateAndCacheAggregateData());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('aggregate') - Date.now()) / 1000
  );
  log(
    chalk.magenta(
      `Sent aggregate data to user. Cache expires in ${secondsUntilCacheExpires}s.`
    )
  );

  async function calculateAndCacheAggregateData() {
    // Used to time process
    const start = process.hrtime.bigint();

    // Generates object to be populated with aggregate data
    // This object is eventually sent as the response JSON
    const aggregateResponse = {
      count_of_submissions: await Model.Rating.count(),
      count_of_all_ratings: 0,
      most_rated_fruit_name: '',
      least_rated_fruit_name: '',
      fruit: {
        bananas: {},
        blueberries: {},
        cherries: {},
        coconuts: {},
        grapefruits: {},
        grapes: {},
        green_apples: {},
        lemons: {},
        melons: {},
        oranges: {},
        red_apples: {},
        peaches: {},
        pears: {},
        pineapples: {},
        strawberries: {},
        watermelons: {},
      },
    };

    // Tracks which fruits have the most & least ratings and greatest / least
    // standard deviation for x and y
    let most_rated_fruit_count_of_ratings = 0;
    let least_rated_fruit_count_of_ratings = 1000000000000000;

    for (let fruit in aggregateResponse.fruit) {
      const data = await sequelize
        .query(
          `
          SELECT 
          COUNT(${fruit}_x) as count, 
          AVG(${fruit}_x) as avg_x,
          MIN(${fruit}_x) as min_x, 
          MAX(${fruit}_x) as max_x, 
          stddev_pop(${fruit}_x) as std_dev_x, 
          AVG(${fruit}_y) as avg_y,
          MIN(${fruit}_y) as min_y, 
          MAX(${fruit}_y) as max_y, 
          stddev_pop(${fruit}_y) as std_dev_y
          FROM "Ratings";`,
          { type: sequelize.QueryTypes.SELECT }
        )
        .then((data) => data[0]); // pulls out object from array of length 1
      data.count = parseInt(data.count); // convert count from str to int
      aggregateResponse.fruit[fruit] = data; // add to response

      // Adds the given fruit's ratings to the total count
      aggregateResponse.count_of_all_ratings += data.count;

      // Checks if fruit is most or least rated, greatest / least std dev
      if (data.count > most_rated_fruit_count_of_ratings) {
        most_rated_fruit_count_of_ratings = data.count;
        aggregateResponse.most_rated_fruit_name = fruit;
      }
      if (data.count < least_rated_fruit_count_of_ratings) {
        least_rated_fruit_count_of_ratings = data.count;
        aggregateResponse.least_rated_fruit_name = fruit;
      }
    }

    // Store results in the cache
    cache.set('aggregate', aggregateResponse);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;
    log(
      chalk.magenta(`Calculated + cached aggregate data in ${timeElapsed}s.`)
    );
    return aggregateResponse;
  }
};

//
//
// HANDLE USER SUBMISSIONS OF RATINGS
//
// If the used has previously submitted data, then their previous submission is
// updated. Otherwise, it creates a new row in the DB for them.
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
    res.send('Your ratings have been added to our dataset.');
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
