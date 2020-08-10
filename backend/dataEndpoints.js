const chalk = require('chalk');
const NodeCache = require('node-cache');
const { sequelize } = require('./models');
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
    chalk.blue.bold('SEND DATA > '),
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

      console.log(data);
      averagesData.fruit[fruit] = data;
    }

    // Store results in the cache
    cache.set('averages', averagesData);

    // End process timer
    const end = process.hrtime.bigint();
    const timeElapsedInSeconds = Number(end - start) / 1000000000;
    const timeElapsed = Math.round(timeElapsedInSeconds * 1000) / 1000;

    console.log(
      chalk.red.bold('CACHE > '),
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
  sendAverageData,
  sendEasyBoxData,
  sendTastyBoxData,
};
