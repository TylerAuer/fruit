const express = require('express');
const session = require('express-session');
const endpoints = require('./backend/endpoints');
const db = require('./backend/models');
const chalk = require('chalk');

const app = express();
app.use(express.json());
app.use(
  session({
    secret: 'temp_secret',
    secure: false,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);
const port = 4000;

///////////////////////////////////////////////
// Set Up PSQL Database
const syncDatabaseToModels = async () => {
  // Use to rebuild the DB (WILL DELETE DATA)
  //await db.sequelize.sync({ force: true });

  await db.sequelize.sync();
  console.log(chalk.blue('Finished synchronizing the DB'));
  console.log('');
};

// Only runs when the Database does not exist or when the models don't
// match the current state of the DB
syncDatabaseToModels();

///////////
// ROUTES

// Make static files available from build folder
app.use(express.static(__dirname + '/build'));

// Send build of React app when visit the root dir
app.get('/', (req, res) => res.sendFile(__dirname + '/build/index.html'));

// GET AGGREGATE RATINGS
app.get('/aggregate', endpoints.getAggregateRatings);

// SUBMIT NEW RATINGS
app.post('/submit', endpoints.submitRatings);

console.log('');
console.log(chalk.bgBlue.bold('** Initializing App **'));
console.log('');
app.listen(port, () => {
  console.log(chalk.blue.bold(`Listening at http://localhost:${port}`));
});
