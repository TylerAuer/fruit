import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import useManageUserRatings from './shared/hooks/useManageUserRatings';
import ScrollToTop from './shared/functions/ScrollToTop';
import ReturningUserModal from './shared/components/Modals/ReturningUserModal';
import About from './AboutPage';
import Matrix from './MatrixPage';
import Data from './DataPage';

const App = () => {
  // Held in app state so not lost when navigating
  const { ratings, setRatings, foundPreviousRatings } = useManageUserRatings();
  const [showReturningUserModal, setShowReturningUserModal] = useState(false);

  // Config initial Google Analytics tracking info
  ReactGA.initialize('UA-177254644-1');

  useEffect(() => {
    if (foundPreviousRatings) {
      setShowReturningUserModal(true);
    }
  }, [foundPreviousRatings]);

  return (
    <Router>
      <ScrollToTop />
      <ReturningUserModal
        show={showReturningUserModal}
        setShow={setShowReturningUserModal}
        ratings={ratings}
      />
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
