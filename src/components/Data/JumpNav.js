import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './JumpNav.scss';

const JumpNav = () => {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <div className="nav__title">Jump to Section</div>
        <ul className="nav__ul">
          <li className="nav__li">
            <Link className="nav__link" to="/data/#percentiles">
              Percentiles
            </Link>
          </li>
          <li className="nav__li">
            <Link className="nav__link" to="/data/#frequencies">
              Rating Frequencies
            </Link>
          </li>
          <li className="nav__li">
            <Link className="nav__link" to="/data/#iso-dimensions">
              Isolated Dimensions
            </Link>
          </li>
          <li className="nav__li">
            <Link className="nav__link" to="/data/#histograms">
              2D Histograms
            </Link>
          </li>
          <li className="nav__li">
            <Link className="nav__link" to="/data/#correlation">
              Correlation Matrices
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default JumpNav;
