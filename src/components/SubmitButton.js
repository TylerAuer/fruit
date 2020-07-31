import React from 'react';
import './SubmitButton.scss';

const SubmitButton = ({ ratings }) => {
  const onClick = () => {
    // This will make a POST request to backend to add user's rankings to DB
    return null;
  };

  return (
    <button className="submit-button" onClick={onClick}>
      Submit Ratings
    </button>
  );
};

export default SubmitButton;
