import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import useManageUserRatings from '../hooks/useManageUserRatings';
import ScrollToTop from '../functions/ScrollToTop';
import About from './About';
import Graph from './Graph';
import Data from './Data/Data';
import 'toasted-notes/src/styles.css';
import '../components/Toasts.scss';

const App = () => {
  // Held in app state so not lost when navigating
  const { ratings, setRatings } = useManageUserRatings();

  // Config initial Google Analytics tracking info
  useEffect(() => {
    ReactGA.initialize('UA-177254644-1');
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Graph ratings={ratings} setRatings={setRatings} />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/data" component={Data} />
      </Switch>
    </Router>
  );
};

export default App;
