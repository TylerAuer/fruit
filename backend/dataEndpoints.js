const Model = require('./models');
const { listOfFruit } = require('./listOfFruit');
const NodeCache = require('node-cache');
const chalk = require('chalk');
const { sequelize } = require('./models');

//
//
// INITIALIZE THE CACHE
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
  console.log(
    chalk.blue.bold('SEND DATA > '),
    chalk.blue(
      `Sent aggregate data to user.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
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
      fruit: {},
    };

    for (let fruit of listOfFruit) {
      aggregateResponse.fruit[fruit] = {};
    }

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
          percentile_cont(0.5) WITHIN GROUP (ORDER BY ${fruit}_x) as median_x,
          AVG(${fruit}_y) as avg_y,
          MIN(${fruit}_y) as min_y, 
          MAX(${fruit}_y) as max_y, 
          stddev_pop(${fruit}_y) as std_dev_y,
          percentile_cont(0.5) WITHIN GROUP (ORDER BY ${fruit}_y) as median_y
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
    console.log(
      chalk.red.bold('CACHE > '),
      chalk.red(`Aggregate data (${timeElapsed}s)`)
    );
    return aggregateResponse;
  }
};

//
//
// EASY BOX DATA
//
//
const sendEasyBoxData = async (req, res) => {
  if (cache.has('easyBox')) {
    res.send(cache.get('easyBox'));
  } else {
    res.send(await calculateAndCacheEasyBox());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('easyBox') - Date.now()) / 1000
  );

  console.log(
    chalk.blue.bold('SEND DATA >'),
    chalk.blue(
      `Sent easy box chart data to user.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
    )
  );

  async function calculateAndCacheEasyBox() {
    // Start timer
    const start = process.hrtime.bigint();

    let data = [];
    // Query and process std dev and avg for each fruit
    // Then add to data array
    for (let fruit of listOfFruit) {
      let query = await sequelize.query(
        `
        SELECT
        AVG(${fruit}_x) as avg,
        percentile_cont(0.25) WITHIN GROUP (ORDER BY ${fruit}_x) as q1,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY ${fruit}_x) as q3
        FROM "Ratings";
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      query = query[0];
      data.push({
        name: fruit,
        avg: query.avg,
        q1: query.q1,
        q3: query.q3,
      });
    }

    // Sorts with easiest fruit first
    data.sort((a, b) => b.avg - a.avg);

    // Store results in the cache
    cache.set('easyBox', data);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;
    console.log(
      chalk.red.bold('CACHE > '),
      chalk.red(`Easy box chart data (${timeElapsed}s)`)
    );

    return data;
  }
};

//
//
// TASTY BOX DATA
//
//
const sendTastyBoxData = async (req, res) => {
  if (cache.has('tastyBox')) {
    res.send(cache.get('tastyBox'));
  } else {
    res.send(await calculateAndCacheTastyBox());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('tastyBox') - Date.now()) / 1000
  );

  console.log(
    chalk.blue.bold('SEND DATA >'),
    chalk.blue(
      `Sent easy box chart data to user.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
    )
  );

  async function calculateAndCacheTastyBox() {
    // Start timer
    const start = process.hrtime.bigint();

    let data = [];
    // Query and process std dev and avg for each fruit
    // Then add to data array
    for (let fruit of listOfFruit) {
      let query = await sequelize.query(
        `
        SELECT
        AVG(${fruit}_y) as avg,
        percentile_cont(0.25) WITHIN GROUP (ORDER BY ${fruit}_y) as q1,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY ${fruit}_y) as q3
        FROM "Ratings";
        `,
        {
          type: sequelize.QueryTypes.SELECT,
        }
      );
      query = query[0];
      data.push({
        name: fruit,
        avg: query.avg,
        q1: query.q1,
        q3: query.q3,
      });
    }

    // Sorts with least tasty fruit first
    data.sort((a, b) => a.avg - b.avg);

    // Store results in the cache
    cache.set('tastyBox', data);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;
    console.log(
      chalk.red.bold('CACHE > '),
      chalk.red(`Easy box chart data (${timeElapsed}s)`)
    );

    return data;
  }
};

module.exports = {
  sendAggregateDataToUser,
  sendEasyBoxData,
  sendTastyBoxData,
};
