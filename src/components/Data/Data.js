import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import Header from '../Header';
import Intro from './Intro';
import JumpNav from './JumpNav';
import Frequencies from './Frequencies';
import Histograms from './Histograms';
import Correlation from './Correlation';
import '../secondary-page.scss';
import Dimensions from './Dimensions';

const Data = () => {
  const [countOfAllRatings, setCountOfAllRatings] = useState(null);
  const [countOfUsers, setCountOfUsers] = useState(null);
  const [countsByFruit, setCountsByFruit] = useState(null);

  ReactGA.pageview('/data');

  useEffect(() => {
    // Get total count of ratings and count of users
    fetch('/data/counts-of-ratings-and-users')
      .then((res) => res.json())
      .then((count) => {
        setCountOfAllRatings(count.count_of_all_ratings);
        setCountOfUsers(count.count_of_users);
      });

    // Get counts by fruit
    fetch('/data/counts-of-ratings-by-fruit')
      .then((res) => res.json())
      .then((countsByFruit) => {
        setCountsByFruit(countsByFruit);
      });
  }, []);

  return (
    <div className="secondary">
      <Header />
      <main>
        <Intro />
        <JumpNav />
        <Frequencies
          countOfUsers={countOfUsers}
          countOfAllRatings={countOfAllRatings}
          countsByFruit={countsByFruit}
        />
        <Dimensions countOfUsers={countOfUsers} />
        <Histograms countsByFruit={countsByFruit} />
        <Correlation />
      </main>
    </div>
  );
};

export default Data;
