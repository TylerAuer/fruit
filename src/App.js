import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import useManageUserRatings from './shared/hooks/useManageUserRatings';
import ScrollToTop from './shared/functions/ScrollToTop';
import About from './AboutPage';
import Matrix from './MatrixPage';
import Data from './DataPage';
import 'toasted-notes/src/styles.css';
import './shared/components/Toasts/Toasts.scss';

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
          <Matrix ratings={ratings} setRatings={setRatings} />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/data">
          <Data ratings={ratings} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
