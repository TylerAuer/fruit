const express = require('express');
const endpoints = require('./backend/endpoints');
const app = express();
const port = 4000;

///////////
// ROUTES

// Make static files available from build folder
app.use(express.static(__dirname + '/build'));

// Send build of React app when visit the root dir
app.get('/', (req, res) => res.sendFile(__dirname + '/build/index.html'));

// GET AGGREGATE RATINGS
// app.get('/aggregate', endpoints.getAggregateRatings)

// SUBMIT NEW RATINGS
// app.post('/submit', endpoints.submitRatings);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
