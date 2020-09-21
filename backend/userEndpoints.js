const Model = require('./models');
const chalk = require('chalk');
const { listOfFruit } = require('./listOfFruit');
const { sequelize } = require('./models');

//
//
// CHECK IF USER HAS PREVIOUSLY RATED FRUIT (ON APP LOAD)
//
//
const checkForPreviousRatings = async (req, res) => {
  const priorRatings = await Model.Rating.findOne({
    where: {
      session_id: req.sessionID,
    },
  });

  // No matching session found in ratings table of DB
  if (!priorRatings) {
    res.status(404).send(null);
    return;
  }

  const responseOfPreviousRatings = {};
  for (let fruit of listOfFruit) {
    let fruitXAndY = {};
    // No rating for this fruit
    if (priorRatings[`${fruit}_x`]) {
      fruitXAndY.x = priorRatings[`${fruit}_x`];
      fruitXAndY.y = priorRatings[`${fruit}_y`];
    } else {
      fruitXAndY = null;
    }
    responseOfPreviousRatings[fruit] = fruitXAndY;
  }

  res.send(responseOfPreviousRatings);

  console.log(
    chalk.cyan.bold('USER SUBMISSION >'),
    chalk.cyan('Loaded previous ratings and sent them to the user')
  );
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

  const previousRatings = await Model.Rating.findOne({
    where: {
      session_id: req.sessionID,
    },
  });

  const userPreviouslySubmittedRatings = !!previousRatings;

  if (userPreviouslySubmittedRatings) {
    Model.Rating.update(ratingsForDB, {
      where: {
        session_id: req.sessionID,
      },
    });
    console.log(
      chalk.cyan.bold('USER SUBMISSION >'),
      chalk.cyan('Updating set of ratings')
    );
    res.send("We've updated your ratings in our dataset.");
  } else {
    Model.Rating.create(ratingsForDB).catch((err) => console.log(err));
    console.log(
      chalk.cyan.bold('USER SUBMISSION > ') +
        chalk.cyan('Recording new ratings')
    );
    res.send("We've added your ratings to our dataset.");
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

const sendUserPercentileData = async (req, res) => {
  // Get the percentile rank for each fruit (x and y)
  const userPercentiles = {};

  // ~ Get the count below and count above
  for (let fruit of listOfFruit) {
    if (req.body[fruit]) {
      // check that this fruit has a rating
      let xCountBelow = await sequelize.query(`
        SELECT COUNT(*) 
        FROM "Ratings" 
        WHERE ${fruit}_x < ${req.body[fruit].x}
      `);
      let xCountAbove = await sequelize.query(`
        SELECT COUNT(*) 
        FROM "Ratings" 
        WHERE ${fruit}_x > ${req.body[fruit].x}
      `);
      let yCountBelow = await sequelize.query(`
        SELECT COUNT(*) 
        FROM "Ratings" 
        WHERE ${fruit}_y < ${req.body[fruit].y}
      `);
      let yCountAbove = await sequelize.query(`
        SELECT COUNT(*) 
        FROM "Ratings" 
        WHERE ${fruit}_y > ${req.body[fruit].y}
      `);

      xCountBelow = parseInt(xCountBelow[0][0].count);
      xCountAbove = parseInt(xCountAbove[0][0].count);
      yCountBelow = parseInt(yCountBelow[0][0].count);
      yCountAbove = parseInt(yCountAbove[0][0].count);

      const xPercentileBelow =
        Math.round((xCountBelow / (xCountBelow + xCountAbove)) * 1000) / 10;
      const xPercentileAbove =
        Math.round((xCountAbove / (xCountBelow + xCountAbove)) * 1000) / 10;
      const yPercentileBelow =
        Math.round((yCountBelow / (yCountBelow + yCountAbove)) * 1000) / 10;
      const yPercentileAbove =
        Math.round((yCountAbove / (yCountBelow + yCountAbove)) * 1000) / 10;

      userPercentiles[fruit] = {
        x: {
          below: xPercentileBelow,
          above: xPercentileAbove,
        },
        y: {
          below: yPercentileBelow,
          above: yPercentileAbove,
        },
      };
    }
  }
  res.json(userPercentiles);
};

module.exports = {
  storeOrUpdateUserRatings,
  checkForPreviousRatings,
  sendUserPercentileData,
};
