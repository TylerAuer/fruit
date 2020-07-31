import React from 'react';

const Header = (props) => {
  return (
    <header className="header">
      <h2 className="header__title">Fruit Matrix</h2>
      <div className="header__subtitle">
        An aggregator of people's feelings about fruit. Inspired by XKCD.
      </div>
    </header>
  );
};

export default Header;
