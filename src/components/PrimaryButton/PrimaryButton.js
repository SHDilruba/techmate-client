import React from 'react';

const PrimaryButton = ({children}) => {
  return (
    <button className="btn bg-gradient-to-l from-secondary to-accent rounded text-white text-[0.4rem] md:text-[0.8rem">{children}</button>
  );
};

export default PrimaryButton;