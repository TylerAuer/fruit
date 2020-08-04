const express = require('express');
const db = require('./backend/models');
const endpoints = require('./backend/endpoints');

const app = express();
app.use(express.json());
const port = 4000;

///////////////////////////////////////////////
// Set Up PSQL Database
const syncDatabaseToModels = async () => {
  // Use to rebuild the DB (WILL DELETE DATA)
  // await db.sequelize.sync({ force: true });
  await db.sequelize.sync();
  console.log('Finished synchronizing the DB');
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
