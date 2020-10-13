const Model = require('./models');
const { sequelize } = require('./models');
const { listOfFruit } = require('./listOfFruit');

const users = async (req, res) => {
  let response = {
    schemaVersion: 1,
    label: 'Users',
    message: await Model.Rating.count(),
  };

  res.send(response);
};

const ratings = async (req, res) => {
  let response = {
    schemaVersion: 1,
    label: 'Ratings',
    message: 0,
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
    response.message += parseInt(count);
  }

  res.send(response);
};

module.exports = {
  users,
  ratings,
};
