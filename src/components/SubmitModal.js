import React from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from './Button';
import './SubmitModal.scss';

const SubmitModal = ({ show, setShow }) => {
  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      blockScroll={false}
      center
    >
      <h2 className="modal__title">Thanks for sharing!</h2>
      <div className="modal__body">
        <p>
          If you change your mind, you can always submit changes and we'll
          update your ratings.
        </p>
        <h2 className="modal__title">Don't stop now!</h2>
        <p>
          There's so much more to see. You can see TONS of charts and graphs
          about the data we've received. Or, you can learn more about the site.
        </p>
        <div className="submit-modal-btn-container">
          <Link to="./data">
            <Button onClick={null} text="See all the data" />
          </Link>
          <Link to="/about">
            <Button text="Learn about the site" />
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitModal;
