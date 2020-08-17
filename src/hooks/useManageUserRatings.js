import React, { useState, useEffect } from 'react';
import fruitList from '../components/Fruit.json';
import toaster from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import '../components/Toasts.scss';

const useManageUserRatings = () => {
  const [ratings, setRatings] = useState(fruitList);

  // When the app first loads, see if the user's active session matches
  // the session IDs in the Ratings table of the database. If so, populate the
  // the ratings state with their previous ratings
  useEffect(() => {
    fetch('/previous-ratings').then((res) => {
      if (res.status === 200) {
        res.json().then((ratings) => setRatings(ratings));
        toaster.notify(
          <div className="toast__msg">
            <p>
              <b>Welcome back! We found your previous ratings!</b>
            </p>
            <p>
              Don't like your choices? If you submit changes, we'll update the
              ratings.
            </p>
          </div>,
          { duration: 6000 }
        );
      }
    });
  }, []);

  const submitRatings = () => {
    // If no fruit are rated, don't submit and communicate to user
    let atLeastOneFruitIsRated = false;
    for (let fruit in fruitList) {
      if (ratings[fruit] && ratings[fruit].x) {
        atLeastOneFruitIsRated = true;
      }
    }
    if (!atLeastOneFruitIsRated) {
      toaster.notify(
        <div className="toast__msg">
          <p>
            <b>Whoops!</b>
          </p>
          <p>
            You must rate at least one fruit before you submit your ratings.
          </p>
        </div>
      );
      return;
    }

    const roundToTenths = (float) => {
      return Math.round(float * 10) / 10;
    };

    // round data to one decimal place
    const roundedRatings = { ...ratings };
    Object.keys(roundedRatings).forEach((fruit) => {
      // Check if not null
      if (roundedRatings[fruit]) {
        roundedRatings[fruit].x = roundToTenths(roundedRatings[fruit].x);
        roundedRatings[fruit].y = roundToTenths(roundedRatings[fruit].y);
      }
    });

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roundedRatings),
    })
      .then((res) => res.text())
      .then((message) =>
        toaster.notify(
          <div className="toast__msg">
            <p>
              <b>Submission Recieved!</b>
            </p>
            <p>{message}</p>
          </div>
        )
      )
      .catch((error) => {
        toaster.notify(
          <div className="toast__msg">
            <p>
              <b>Ugh oh!</b>
            </p>
            <p>So sorry! There was an error submiting your ratings.</p>
          </div>
        );
        console.log(error);
      });
  };

  return { ratings, setRatings, submitRatings };
};

export default useManageUserRatings;
