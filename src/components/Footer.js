import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toaster from 'toasted-notes';
import ReactGA from 'react-ga';
import Button from './Button';
import SubmitModal from './SubmitModal';
import XKCDModal from './XKCDModal';
import roundRatings from '../functions/roundRatings';
import 'react-responsive-modal/styles.css';
import 'toasted-notes/src/styles.css';
import '../components/Toasts.scss';
import './Bottom.scss';

const Footer = ({ showAggregate, setShowAggregate, areAnyRated, ratings }) => {
  const [showXKCDModal, setShowXKCDModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitModalTitle, setSubmitModalTitle] = useState('Thanks!');

  const submitRatings = () => {
    const roundedRatings = roundRatings(ratings);

    fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roundedRatings),
    })
      .then((res) => res.text())
      .then((message) => {
        setSubmitModalTitle(message);
        if (message === "We've updated your ratings in our dataset.") {
          ReactGA.event({
            category: 'Matrix',
            action: 'Submit',
            label: 'Updated ratings',
          });
        } else {
          ReactGA.event({
            category: 'Matrix',
            action: 'Submit',
            label: 'New ratings',
          });
        }
        setShowSubmitModal(true);
      })
      .catch((error) => {
        toaster.notify(
          <div className="toast__msg">
            <p>
              <b>Ugh oh!</b>
            </p>
            <p>So sorry! There was an error submitting your ratings.</p>
          </div>
        );
        console.log(error);
      });
  };

  const onClickOfSubmitRatings = () => {
    if (showAggregate) {
      return null;
    } else if (!areAnyRated) {
      ReactGA.event({
        category: 'Matrix',
        action: 'Submit',
        label: 'FAILED: tried to submit with no fruit rated',
      });
      toaster.notify(
        <div className="toast__msg">
          <p>
            <b>Whoops!</b>
          </p>
          <p>
            You must rate at least one fruit before you submit your ratings.
          </p>
        </div>,
        { duration: 3000 }
      );
      return null;
    } else {
      submitRatings();
    }
  };

  return (
    <div className="bottom">
      <div className="bottom__buttons">
        <Button
          disabled={showAggregate}
          text="Submit Ratings"
          onClick={() => {
            onClickOfSubmitRatings();
          }}
        />
        <Button
          text={showAggregate ? 'Show Your Ratings' : 'Show Aggregate Ratings'}
          onClick={() => {
            if (!showAggregate) {
              ReactGA.event({
                category: 'Matrix',
                action: 'Aggregate',
                label: 'Show aggregate',
              });
            }
            setShowAggregate(!showAggregate);
          }}
        />
      </div>
      <header>
        <h1 className="bottom__title">Fruit Matrix</h1>
      </header>
      <div className="bottom__link-container">
        <Link to="/about" className="bottom__link">
          About
        </Link>

        <button className="bottom__link" onClick={() => setShowXKCDModal(true)}>
          Inspiration
        </button>
        <Link to="/data" className="bottom__link">
          Data
        </Link>
      </div>
      <SubmitModal
        title={submitModalTitle}
        show={showSubmitModal}
        setShow={setShowSubmitModal}
      />
      <XKCDModal show={showXKCDModal} setShow={setShowXKCDModal} />
    </div>
  );
};

export default Footer;
