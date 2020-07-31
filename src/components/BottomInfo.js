import React from 'react';
import './BottomInfo.scss';

const BottomInfo = (props) => {
  return (
    <>
      <header className="bottom">
        {/* <div className="bottom__subtitle">
          An aggregator of people's feelings about fruit. Inspired by XKCD.
        </div> */}
        <h1 className="bottom__title">Fruit Matrix</h1>
        <div className="bottom__link-container">
          {/* <a className="bottom__link">Help</a> */}
          <a className="bottom__link" href="https://tylerauer.com">
            Tyler Auer
          </a>
          <a className="bottom__link" href="https://xkcd.com/">
            XKCD
          </a>
        </div>
      </header>
    </>
  );
};

export default BottomInfo;
