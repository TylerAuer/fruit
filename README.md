# Fruit Matrix

Fruit Matrix is aggregator of people's feelings about fruit with [an obsession with data](https://fruit.tylerauer.com/data). It's inspired by [XKCD (WARNING: curse word)](https://xkcd.com/388/) and [The New York Times](https://www.nytimes.com/interactive/2017/08/09/upshot/game-of-thrones-chart.html).


## Technologies

### Frontend

This is a [React](https://reactjs.org/) application that makes use of [React-Router](https://reactrouter.com/web/guides/quick-start) for routing and D3 for the visualizations on the data page. I also used [Toasted-Notes](https://toasted-notes.netlify.app/) and [React-draggable](https://www.npmjs.com/package/react-draggable).

### Backend

The backend is built with [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), and a [PostgreSQL](https://www.postgresql.org/) database. I used [Sequelize](https://sequelize.org/) to make interacting with Postgres easier.

### Deployment

The site is hosted with [Heroku](https://www.heroku.com/home). Which makes maintenance efficient -- pushes to `master` automatically create new builds.

## Potential Enhancements

### Matrix

- Help overlay
- Move fruit to bottom on mobile to avoid swipe-down refresh by accident
- Store current positions in cookies so data isn't lost when user leaves or refreshes by accident
- Guidance to point user towards data page after they submit
- Improved fruit graphics, especially melons

### Data

- Chart that tracks the total submissions over time
- Chart that tracks how a fruit's average position has changed over time
- Toggle to show your placement over each chart

### Other

- Link to actual comic without the title (maybe in a modal). Email Randall Munroe to
