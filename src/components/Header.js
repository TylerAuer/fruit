import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../shared/components/Button';
import './Header.scss';

const Header = () => {
  const history = useHistory();
  return (
    <header className="header">
      <h1 className="header__title">
        <Link to="/">Fruit Matrix</Link>
      </h1>
      <div className="header__subtitle">
        An aggregator of people's feelings about fruit. Inspired by xkcd.
      </div>
      <Button onClick={() => history.push('/')} text="Back to Matrix" />
    </header>
  );
};

export default Header;
