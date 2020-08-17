import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import xkcdImg from '../img/xkcd388.png';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from './Button';
import './Bottom.scss';

const Footer = ({ submitRatings, showAggregate, setShowAggregate }) => {
  const [showXKCDModal, setShowXKCDModal] = useState(false);
  const onClickOfSubmitRatings = () => {
    return showAggregate ? null : submitRatings();
  };

  return (
    <div className="bottom">
      <div className="bottom__buttons">
        <Button
          disabled={showAggregate}
          text="Submit Ratings"
          onClick={onClickOfSubmitRatings}
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
        <Modal
          open={showXKCDModal}
          onClose={() => setShowXKCDModal(false)}
          center
        >
          <h2 className="modal__title">Inspired by XKCD</h2>
          <img
            src={xkcdImg}
            className="modal__img"
            alt="The comic that inspired this site"
          />
          <div className="modal__body">
            <p>
              This site was inspired by this post from Randall Munroe's webcomic{' '}
              <a href="http://xkcd.com/">XKCD</a>. He's written{' '}
              <a href="https://www.amazon.com/Randall-Munroe/e/B004H66444">
                some great books
              </a>{' '}
              you should check out!
            </p>
            <p>
              You can read more about the influences for this site on the{' '}
              <Link to="/about">About Page</Link>.
            </p>
          </div>
        </Modal>

        <Link to="/data" className="bottom__link">
          Data
        </Link>
      </div>
    </div>
  );
};

export default Footer;
