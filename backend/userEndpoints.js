const Model = require('./models');
const { sequelize } = require('./models');
const { listOfFruit } = require('./listOfFruit');
const chalk = require('chalk');

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
      chalk.blue.bold('USER SUBMISSION > ') +
        chalk.blue('Updating set of ratings')
    );
    res.send("We've updated your previous ratings in our dataset.");
  } else {
    Model.Rating.create(ratingsForDB);
    console.log(
      chalk.blue.bold('USER SUBMISSION > ') +
        chalk.blue('Recording new ratings')
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
};
