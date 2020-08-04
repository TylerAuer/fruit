import React from 'react';
import Button from './Button';
import './Bottom.scss';

const Bottom = ({ submitRatings, showAggregate, setShowAggregate }) => {
  return (
    <div className="bottom">
      <div className="bottom__buttons">
        <Button text="Submit Ratings" onClick={submitRatings} />
        <Button
          text={showAggregate ? 'Hide Aggregate' : 'Show Aggregate'}
          onClick={() => setShowAggregate(!showAggregate)}
        />
      </div>
      <header>
        <h1 className="bottom__title">Fruit Matrix</h1>
        {/* <div className="bottom__subtitle">
          An aggregator of people's feelings about fruit. Inspired by XKCD.
        </div> */}
      </header>
      <div className="bottom__link-container">
        <a className="bottom__link" href="https://fruit.tylerauer.com/about">
          About
        </a>
        <a className="bottom__link" href="https://xkcd.com/">
          XKCD
        </a>
      </div>
    </div>
  );
};

export default Bottom;
