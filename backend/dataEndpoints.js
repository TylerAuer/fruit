const Model = require('./models');
const chalk = require('chalk');
const NodeCache = require('node-cache');
const { sequelize } = require('./models');
const { Op } = require('sequelize');
const { listOfFruit } = require('./listOfFruit');

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
const sendAverageData = async (req, res) => {
  if (cache.has('averages')) {
    res.send(cache.get('averages'));
  } else {
    res.send(await calculateAndCacheAverageData());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('averages') - Date.now()) / 1000
  );
  console.log(
    chalk.blue.bold('SEND DATA >'),
    chalk.blue(
      `Sent averages of fruit ratings to user.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
    )
  );

  async function calculateAndCacheAverageData() {
    // Used to time process
    const start = process.hrtime.bigint();

    // Generates object to be populated with aggregate data
    // This object is eventually sent as the response JSON
    const averagesData = {
      fruit: {},
    };

    for (let fruit of listOfFruit) {
      const data = await sequelize
        .query(
          `
          SELECT 
          AVG(${fruit}_x) as avg_x,
          AVG(${fruit}_y) as avg_y
          FROM "Ratings";`,
          { type: sequelize.QueryTypes.SELECT }
        )
        .then((data) => data[0]); // pulls out object from array of length 1

      averagesData.fruit[fruit] = data;
    }

    // Store results in the cache
    cache.set('averages', averagesData);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;

    console.log(
      chalk.red.bold('CACHE >'),
      chalk.red(`Averages data (${timeElapsed}s)`)
    );
    return averagesData;
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
      chalk.red.bold('CACHE >'),
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
      `Sent tasty box chart data to user.`,
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
      chalk.red.bold('CACHE >'),
      chalk.red(`Tasty box chart data (${timeElapsed}s)`)
    );

    return data;
  }
};

//
//
// COUNTS OF RATINGS BY FRUIT
//
//
const sendCountsOfRatings = async (req, res) => {
  if (cache.has('countsByFruit')) {
    res.send(cache.get('countsByFruit'));
  } else {
    res.send(await calculateAndCacheCountsOfRatings());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('countsByFruit') - Date.now()) / 1000
  );

  console.log(
    chalk.blue.bold('SEND DATA >'),
    chalk.blue(
      `Counts of ratings.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
    )
  );

  async function calculateAndCacheCountsOfRatings() {
    // Used to time process
    const start = process.hrtime.bigint();

    // Generates object to be populated with aggregate data
    // This object is eventually sent as the response JSON
    const countsData = [];

    for (let fruit of listOfFruit) {
      const data = await sequelize
        .query(
          `
          SELECT 
          COUNT(${fruit}_x) as count
          FROM "Ratings";`,
          { type: sequelize.QueryTypes.SELECT }
        )
        .then((data) => data[0]); // pulls out object from array of length 1

      const singleFruitCounts = {
        name: fruit,
        count: parseInt(data.count),
      };
      countsData.push(singleFruitCounts);
    }

    // Sorts the results descending by counts
    countsData.sort((a, b) => b.count - a.count);

    // Store results in the cache
    cache.set('countsByFruit', countsData);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;

    console.log(
      chalk.red.bold('CACHE >'),
      chalk.red(`Counts by fruit data (${timeElapsed}s)`)
    );
    return countsData;
  }
};

//
//
// TOTAL COUNT OF RATINGS
//
//
const sendCountOfAllRatingsAndUsers = async (req, res) => {
  if (cache.has('countOfAllRatingsAndUsers')) {
    res.send(cache.get('countOfAllRatingsAndUsers'));
  } else {
    res.send(await calculateAndCacheCountOfAllRatingsAndUsers());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('countOfAllRatingsAndUsers') - Date.now()) / 1000
  );

  console.log(
    chalk.blue.bold('SEND DATA >'),
    chalk.blue(
      `Count of all ratings.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
    )
  );

  async function calculateAndCacheCountOfAllRatingsAndUsers() {
    // Used to time process
    const start = process.hrtime.bigint();

    let response = {
      count_of_all_ratings: 0,
      count_of_users: await Model.Rating.count(),
    };

    for (let fruit of listOfFruit) {
      const count = await sequelize
        .query(
          `
          SELECT 
          COUNT(${fruit}_x) as count
          FROM "Ratings";`,
          {
            type: sequelize.QueryTypes.SELECT,
          }
        )
        .then((data) => data[0].count); // pulls out object from obj in array
      response.count_of_all_ratings += parseInt(count);
    }

    // Store results in the cache
    cache.set('countOfAllRatingsAndUsers', response);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;

    console.log(
      chalk.red.bold('CACHE >'),
      chalk.red(`Total rating count and count of users (${timeElapsed}s)`)
    );

    return response;
  }
};

//
//
// 2D HistogramData
//
//
const send2DHistogramData = async (req, res) => {
  if (cache.has('2DHistogramData')) {
    res.send(cache.get('2DHistogramData'));
  } else {
    res.send(await getAndCache2DHistogramData());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('2DHistogramData') - Date.now()) / 1000
  );

  console.log(
    chalk.blue.bold('SEND DATA >'),
    chalk.blue(
      `2D Histogram Data.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
    )
  );

  async function getAndCache2DHistogramData() {
    // Used to time process
    const start = process.hrtime.bigint();

    let data = {};
    // Query and process std dev and avg for each fruit
    // Then add to data array
    for (let fruit of listOfFruit) {
      const fruitData = await Model.Rating.findAll({
        attributes: [
          [`${fruit}_x`, 'x'], // renames key to x
          [`${fruit}_y`, 'y'], // renames key to y
        ],
        where: {
          [`${fruit}_x`]: {
            [Op.ne]: null, // skips rows where rating is null
          },
        },
      });

      data[fruit] = {};
      data[fruit].ratings = fruitData;
    }

    // Store results in the cache
    cache.set('2DHistogramData', data);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;

    console.log(
      chalk.red.bold('CACHE >'),
      chalk.red(`2D Histogram Data (${timeElapsed}s)`)
    );

    return data;
  }
};

//
//
// Correlation Data
//
//
const sendCorrelationData = async (req, res) => {
  if (cache.has('correlationData')) {
    res.send(cache.get('correlationData'));
  } else {
    res.send(await getAndCacheCorrelationData());
  }

  const secondsUntilCacheExpires = Math.round(
    (cache.getTtl('correlationData') - Date.now()) / 1000
  );

  console.log(
    chalk.blue.bold('SEND DATA >'),
    chalk.blue(
      `Correlation Data.`,
      chalk.red(`Cache TTL: ${secondsUntilCacheExpires}s.`)
    )
  );

  async function getAndCacheCorrelationData() {
    // Used to time process
    const start = process.hrtime.bigint();

    const data = {};
    for (let fruit of listOfFruit) {
      data[fruit] = {
        x: {},
        y: {},
      };
      for (let subFruit of listOfFruit) {
        data[fruit].x[subFruit] = await getCorrelation('x', fruit, subFruit);
        data[fruit].y[subFruit] = await getCorrelation('y', fruit, subFruit);
      }
    }

    // Store results in the cache
    cache.set('correlationData', data);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;

    console.log(
      chalk.red.bold('CACHE >'),
      chalk.red(`Correlation Data (${timeElapsed}s)`)
    );

    return data;
  }

  async function getCorrelation(xOrY, fruit1, fruit2) {
    const cor = await sequelize.query(
      `
        SELECT
        corr(${fruit1}_${xOrY}, ${fruit2}_${xOrY})
        FROM "Ratings";
        `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return Math.round(1000 * cor[0].corr) / 1000;
  }
};

module.exports = {
  sendAverageData,
  sendCountsOfRatings,
  sendEasyBoxData,
  sendTastyBoxData,
  sendCountOfAllRatingsAndUsers,
  send2DHistogramData,
  sendCorrelationData,
};
