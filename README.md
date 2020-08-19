# Fruit Matrix

Fruit Matrix is an aggregator of people's feelings about fruit with [an obsession for data](https://fruit.tylerauer.com/data). Users rate 16 fruits for tastiness and ease of eating. Their ratings are aggregated and displayed in a variety of ways using D3.

## Inspirations

The original idea for the Fruit Matrix comes from [xkcd (WARNING: title includes curse word)](https://xkcd.com/388/). [Desmos](https://teacher.desmos.com/activitybuilder/custom/58cb067910f10b0a21d4db93) implements this on a smaller scale for teachers and the [The New York Times](https://www.nytimes.com/interactive/2017/08/09/upshot/game-of-thrones-chart.html) had a similar application for Game of Thrones.

## Technologies

### Frontend

This is a [React](https://reactjs.org/) application that makes use of [React-Router](https://reactrouter.com/web/guides/quick-start) for routing and D3 for the visualizations on the data page. I also used [Toasted-Notes](https://toasted-notes.netlify.app/) and [React-draggable](https://www.npmjs.com/package/react-draggable).

### Backend

The backend is built with [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), and a [PostgreSQL](https://www.postgresql.org/) database. I used [Sequelize](https://sequelize.org/) to make interacting with Postgres easier.

### Deployment

The site is hosted with [Heroku](https://www.heroku.com/home). Which makes maintenance efficient -- pushes to `master` automatically create and deploy new builds.

## Potential Enhancements

### Matrix

- Help overlay
- Move fruit to bottom on mobile to limit swipe-down refresh by accident
- Store current positions in cookies so data isn't lost when user leaves or refreshes by accident
- Improved fruit graphics, especially melons
- Click button to isolate a dimension (tastiness or easiness)

### Data

- Chart that tracks the total submissions over time
- Chart that tracks how a fruit's average position has changed over time
- Toggle to show your ratings over each chart
- Percentiles for your ratings (ex: You like the taste of (fruit_name) more than x% of raters). If I feel fancy, this could be marked on a histogram of all ratings. May be able use raw data from 2D histograms to simplify the query.

## Interesting Development Tidbits

The queries for the data are fairly complex, so they are cached and updated every minute.

Sessions are used to prevent users from resubmitting over-and-over to bias results. This isn't foolproof, but it feels like the right balance between protecting the app's integrity without requiring creation of user accounts which would likely be too burdensome for teachers using it in classrooms.

## To Run Locally

1. Clone repo
2. Run `npm install`
3. Start backend with `nodemon app.js`
4. Start frontend with `npm start`
5. Open app in browser (use local host port shown when you start the frontend)
6. Have fun!
