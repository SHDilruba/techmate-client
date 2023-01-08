import React from 'react';

const PrimaryButton = ({children}) => {
  return (
    <button className="btn btn-secondary bg-gradient-to-l from-secondary to-accent text-white">{children}</button>
  );
};

export default PrimaryButton;