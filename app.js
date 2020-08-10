const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const endpoints = require('./backend/endpoints');
const db = require('./backend/models');
const chalk = require('chalk');

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
app.use(express.json());
app.use(
  session({
    secret: 'temp_secret',
    store: sessionStore,
    secure: false,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);
const port = 4000;

//
//
// ROUTES
//
//

// Make static files available from build folder
app.use(express.static(__dirname + '/build'));

// Send build of React app when visit the root dir
app.get('/', (req, res) => res.sendFile(__dirname + '/build/index.html'));

// SUBMIT NEW RATINGS
app.post('/submit', endpoints.storeOrUpdateUserRatings);

// GET AGGREGATE RATINGS
app.get('/aggregate', endpoints.sendAggregateDataToUser);

//
app.get('/data/easy-box', endpoints.sendEasyBoxData);

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
