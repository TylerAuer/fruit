import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import Button from './Button';
import './Bottom.scss';
import SubmitModal from './SubmitModal';
import XKCDModal from './XKCDModal';

const Footer = ({ submitRatings, showAggregate, setShowAggregate }) => {
  const [showXKCDModal, setShowXKCDModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const onClickOfSubmitRatings = () => {
    return showAggregate ? null : submitRatings();
  };

  return (
    <div className="bottom">
      <div className="bottom__buttons">
        <Button
          disabled={showAggregate}
          text="Submit Ratings"
          onClick={() => {
            onClickOfSubmitRatings();
            setShowSubmitModal(true);
          }}
        />
        <Button
          text={showAggregate ? 'Show Your Ratings' : 'Show Aggregate Ratings'}
          onClick={() => setShowAggregate(!showAggregate)}
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
      <SubmitModal show={showSubmitModal} setShow={setShowSubmitModal} />
      <XKCDModal show={showXKCDModal} setShow={setShowXKCDModal} />
    </div>
  );
};

export default Footer;
