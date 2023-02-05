import React from 'react';

const DeleteButton = ({children}) => {
 return (
  <div>
      <button className="btn btn-xs bg-red-600 hover:bg-white hover:text-red-500 hover:border-red-500 text-white text-[0.4rem] md:text-[0.8rem]">{children}</button>
  </div>
 );
};

export default DeleteButton;