import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useManageUserRatings from '../hooks/useManageUserRatings';
import useManageAggregate from '../hooks/useManageAggregate';
import About from './About';
import Graph from './Graph';
import AggregateDetails from './AggregateDetails';

const App = () => {
  const { aggregate } = useManageAggregate();
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
          <About aggregate={aggregate} />
        </Route>
        <Route exact path="/details">
          <AggregateDetails aggregate={aggregate} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
