import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useManageUserRatings from '../hooks/useManageUserRatings';
import About from './About';
import Graph from './Graph';
import Data from './Data';

const App = () => {
  // Held in app state so not lost when navigating
  const { ratings, setRatings, submitRatings } = useManageUserRatings();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Graph
            ratings={ratings}
            setRatings={setRatings}
            submitRatings={submitRatings}
          />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/data" component={Data} />
      </Switch>
    </Router>
  );
};

export default App;
