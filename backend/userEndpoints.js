const Model = require('./models');
const chalk = require('chalk');
const { listOfFruit } = require('./listOfFruit');

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
    console.log(
      chalk.cyan.bold('USER SUBMISSION >'),
      chalk.cyan('Updating set of ratings')
    );
    res.send("We've updated your previous ratings in our dataset.");
  } else {
    Model.Rating.create(ratingsForDB);
    console.log(
      chalk.cyan.bold('USER SUBMISSION > ') +
        chalk.cyan('Recording new ratings')
    );
    res.send('Your ratings have been added to our dataset.');
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

module.exports = {
  storeOrUpdateUserRatings,
  checkForPreviousRatings,
};
