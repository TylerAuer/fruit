import React from 'react';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import xkcdImg from '../shared/img/xkcd388.png';
import 'react-responsive-modal/styles.css';

const XKCDModal = ({ show, setShow }) => {
  if (show) {
    ReactGA.modalview('/inspiration');
  }

  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      blockScroll={false}
      center
    >
      <h2 className="modal__title">Inspired by xkcd</h2>
      <img
        src={xkcdImg}
        className="modal__img"
        alt="The comic that inspired this site"
      />
      <div className="modal__body">
        <p>
          This site was inspired by this post from Randall Munroe's webcomic{' '}
          <a href="http://xkcd.com/">xkcd</a>. He's written{' '}
          <a href="https://www.amazon.com/Randall-Munroe/e/B004H66444">
            some great books
          </a>{' '}
          you should check out!
        </p>
        <p>
          You can read more about this site's influences on the{' '}
          <Link to="/about">About Page</Link>.
        </p>
      </div>
    </Modal>
  );
};

export default XKCDModal;
