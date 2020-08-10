import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from './Button';
import './secondary-page.scss';

const Header = () => {
  const history = useHistory();
  return (
    <header className="secondary__header">
      <Link to="/">
        <h1 className="secondary__title">Fruit Matrix</h1>
      </Link>
      <div className="secondary__subtitle">
        An aggregator of people's feelings about fruit. Inspired by XKCD.
      </div>
      <Button onClick={() => history.push('/')} text="Back to Graph" />
    </header>
  );
};

export default Header;
