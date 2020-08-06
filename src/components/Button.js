import React from 'react';
import './Button.scss';

const Button = ({ text, onClick, disabled }) => {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
