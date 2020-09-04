import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const JumpNav = () => {
  return (
    <nav class="nav">
      <div className="nav__wrapper">
        <div className="nav__title">Jump to Sections</div>
        <ul>
          <li>
            <Link className="nav__link" to="/data/#frequencies">
              Rating Frequencies
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="/data/#iso-dimensions">
              Isolated Dimensions
            </Link>
          </li>
          <li>
            <Link className="nav__link" to="/data/#histograms">
              2D Histograms
            </Link>
          </li>
          <li>
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
