import React from 'react';
import { Link } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from '../shared/components/Button';
import '../shared/components/Modals/ReturningUserModal';

const SubmitModal = ({ show, setShow, title }) => {
  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      blockScroll={false}
      center
    >
      <h2 className="modal__title">{title}</h2>
      <div className="modal__body">
        <p>
          Change your mind? <b>You can always submit changes</b>, and we'll
          update your ratings. We'll even remember your ratings if you return to
          this site later.
        </p>
        {/* <h3 className="modal__subtitle">Don't stop now!</h3> */}
        <p>
          There's so much more to see. You can see{' '}
          <b>TONS of charts and graphs</b> analyzing the data we've received.
          Or, you can learn more about the site.
        </p>
        <div className="submit-modal-btn-container">
          <Link to="./data">
            <Button
              className="headshake"
              onClick={null}
              text="See all the data"
            />
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
