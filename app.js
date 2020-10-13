const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const secure = require('express-force-https');
const dataEndpoints = require('./backend/dataEndpoints');
const userEndpoints = require('./backend/userEndpoints');
const badgeEndpoints = require('./backend/badgeEndpoints');
const db = require('./backend/models');
const chalk = require('chalk');
require('dotenv').config();

//
//
// ADD TIMESTAMP TO ALL CONSOLE.LOGs
//
// Overwrites standard console.log with function that prepends the timestamp
//
//
const originalLog = console.log;
// Overwriting
console.log = function () {
  var args = [].slice.call(arguments);
  const timestamp = chalk.dim.green(
    `${new Intl.DateTimeFormat('en', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'America/Los_Angeles',
    }).format(Date.now())} >`
  );
  originalLog.apply(console.log, [timestamp].concat(args));
};

//
//
// CONFIG POSTGRES DATABASE
//
// Creates two tables, one to store session information and another to record
// users' ratings of fruit.
//
// Including { force: true } in syncDatabaseToModels() will wipe previous data
// this is only necessary when making changes during development
//
//

// Create store for session data in Postgres DB
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});

// Only runs when the Database does not exist or when the models don't
// match the current state of the DB
syncDatabaseToModels();

async function syncDatabaseToModels() {
  // Use to rebuild the DB (WILL DELETE DATA)
  // await db.sequelize.sync({ force: true });

  // Use to initialize the DB
  await db.sequelize.sync();

  console.log(
    chalk.yellow.bold('APP > '),
    chalk.yellow('Synchronize database tables')
  );
}

//
//
// CONFIG EXPRESS AND APP
//
//

const app = express();
app.use(secure);
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SESSIONS_SECRET,
    store: sessionStore,
    secure: false,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days = 6 months
    },
  })
);
const port = process.env.PORT || 4000;

//
//
// ROUTES
//
//

// APPLICATION FILES
app.use(express.static(__dirname + '/build'));
app.get('/', (req, res) => res.sendFile(__dirname + '/build/index.html'));

// USER ENDPOINTS
app.post('/submit', userEndpoints.storeOrUpdateUserRatings);
app.get('/previous-ratings', userEndpoints.checkForPreviousRatings);
app.post('/user-percentiles', userEndpoints.sendUserPercentileData);

// DATA ENDPOINTS
app.get('/data/averages', dataEndpoints.sendAverageData);
app.get('/data/easy-box', dataEndpoints.sendEasyBoxData);
app.get('/data/tasty-box', dataEndpoints.sendTastyBoxData);
app.get('/data/counts-of-ratings-by-fruit', dataEndpoints.sendCountsOfRatings);
app.get(
  '/data/counts-of-ratings-and-users',
  dataEndpoints.sendCountOfAllRatingsAndUsers
);
app.get('/data/histograms', dataEndpoints.send2DHistogramData);
app.get('/data/correlation', dataEndpoints.sendCorrelationData);

// GITHUB Badges
app.get('/badge/users', badgeEndpoints.users);
app.get('/badge/ratings', badgeEndpoints.ratings);

//
//
// OPEN PORT FOR APP TO LISTEN AT
//
//

app.listen(port, () =>
  console.log(
    chalk.yellow.bold('APP > '),
    chalk.yellow(`Spin up app on port ${port}`)
  )
);
