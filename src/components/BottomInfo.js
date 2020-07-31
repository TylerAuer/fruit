import React from 'react';
import SubmitButton from './SubmitButton';
import './BottomInfo.scss';

const BottomInfo = ({ ratings }) => {
  return (
    <div className="bottom">
      <SubmitButton ratings={ratings} />
      <header>
        <h1 className="bottom__title">Fruit Matrix</h1>
        {/* <div className="bottom__subtitle">
          An aggregator of people's feelings about fruit. Inspired by XKCD.
        </div> */}
      </header>
      <div className="bottom__link-container">
        {/* <a className="bottom__link">Help</a> */}
        <a className="bottom__link" href="https://tylerauer.com">
          Tyler Auer
        </a>
        <a className="bottom__link" href="https://xkcd.com/">
          XKCD
        </a>
      </div>
    </div>
  );
};

export default BottomInfo;
