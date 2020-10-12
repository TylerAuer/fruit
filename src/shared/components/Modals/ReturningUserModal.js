import React from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';
import Button from '../Button';
import cleanFruitName from '../../functions/cleanFruitName';
import './Modals.scss';
import './GreetReturningUser.scss';

const GreetReturningUser = ({ show, setShow, ratings }) => {
  const history = useHistory();
  const isOnDataPage = history.location.pathname === '/data';
  const isOnMatrixPage = history.location.pathname === '/';

  // Determine user's tastiest and hardest fruits
  let highestTasteRating = -1;
  let tastiestFruit = null;
  let lowestEasyRating = 101;
  let hardestFruit = null;
  for (let fruit in ratings) {
    if (ratings[fruit]) {
      if (ratings[fruit].y > highestTasteRating) {
        highestTasteRating = ratings[fruit].y;
        tastiestFruit = fruit;
      }

      if (ratings[fruit].x < lowestEasyRating) {
        lowestEasyRating = ratings[fruit].x;
        hardestFruit = fruit;
      }
    }
  }

  return (
    <Modal
      open={show}
      onClose={() => setShow(false)}
      blockScroll
      closeOnEsc
      center
    >
      <h2 className="modal__title">Hey, You look familiar!</h2>
      <div className="modal__body">
        <p>
          <b>We found your previous ratings</b> in the back of our fridge.{' '}
          {tastiestFruit && hardestFruit && (
            <span>
              Let's see here...you really like{' '}
              {cleanFruitName(tastiestFruit).toLowerCase()} and think that{' '}
              {cleanFruitName(hardestFruit).toLowerCase()} are hard to eat.
            </span>
          )}
        </p>
        <p>
          If your tastes have changed,{' '}
          <b>
            you can adjust your rankings, click submit, and we'll update your
            ratings
          </b>
          . Or you can skip to the data section and see how other people's
          ratings have affected the aggregate data.
        </p>
        <div className="modal__btn-group">
          <Button
            onClick={() => {
              setShow(false);
              if (!isOnMatrixPage) {
                history.push('/');
              }
            }}
            text="Adjust my ratings"
          />
          <Button
            text="Skip to the fancy charts"
            onClick={() => {
              setShow(false);
              if (!isOnDataPage) {
                history.push('/data');
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default GreetReturningUser;
