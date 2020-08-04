import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useManageUserRatings from '../hooks/useManageUserRatings';
import useManageAggregate from '../hooks/useManageAggregate';
import About from './About';
import Graph from './Graph';
import './Matrix.scss';

/**
 * FRUIT TO ADD IN ONCE I HAVE MADE GRAPHICS FOR THEM
  
  "kiwi": null,
  "nectarine": null,
  "papaya": null,
  "peaches": null,
  "pineapples": null,
  "plums": null,
  "pomegranates": null,
  "seeded_grapes": null,
  "seedless_grapes": null,
  "tomatoes": null,
  "blackberries": null,
  "blueberries": null,
  "grapefruits": null,
  
 */

const App = () => {
  const { aggregate, getAggregate } = useManageAggregate();
  const { ratings, setRatings, submitRatings } = useManageUserRatings();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Graph
            aggregate={aggregate}
            ratings={ratings}
            setRatings={setRatings}
            submitRatings={submitRatings}
          />
        </Route>
        <Route exact path="/about">
          <About
            countOfAllRatings={aggregate.count_of_all_ratings}
            countOfSubmissions={aggregate.count_of_submissions}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
