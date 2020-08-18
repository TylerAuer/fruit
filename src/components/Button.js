import React from 'react';
import './Button.scss';

const Button = ({ text, onClick, disabled, className }) => {
  return (
    <button
      className={`button ${disabled ? 'button--disabled' : ''} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
