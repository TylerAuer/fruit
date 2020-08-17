import React from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const SubmitModal = ({ show, onClose }) => {
  return (
    <Modal open={show} onClose={onClose} center>
      <h2 className="modal__title">What now?</h2>
      <div className="modal__body">
        <p>
          Thanks for submitting ratings! If you change your mind, you can always
          submit changes and we'll update your ratings.
        </p>
        <p>
          <b>
            You definitely don't want to miss the{' '}
            <Link to="/data">Data Page</Link>
          </b>{' '}
          which is full of charts and graphs to help analyze every submission
          we've ever received.
        </p>
        <p>
          You can also check out the <Link to="/about">About Page</Link> if you
          want to learn more about the site or XKCD, the webcomic that inspired
          this.
        </p>
      </div>
    </Modal>
  );
};

export default SubmitModal;
