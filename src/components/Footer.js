import React from 'react';

const Footer = (props) => {
  return (
    <>
      <header className="header">
        <h2 className="header__title">Fruit Matrix</h2>
        <div className="header__subtitle">
          An aggregator of people's feelings about fruit. Inspired by XKCD.
        </div>
      </header>
      <footer className="footer">
        <div className="footer__help-btn">Help</div>
        <div className="footer__tyler-btn">Tyler Auer</div>
        <div className="footer__inspiration-btn">Inspiration</div>
      </footer>
    </>
  );
};

export default Footer;
