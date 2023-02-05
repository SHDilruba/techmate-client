import React from 'react';
import logo2 from "../../assets/icons/logo2.jpeg";

const Footer = () => {
  return (
    <div className='md:flex justify-between text-center pb-5 md:py-20  md:px-40 bg-base-200 mx-auto shadow-xl'>
    <div className='invisible md:visible'>
       <img className="w-16 h-10 rounded-md p-0.5 bg-gradient-to-r from-secondary to-accent shadow-4xl " src={logo2} alt="" />
        <h2 className='text-2xl text-accent text-center'>TechMate</h2>
    </div>
    <div>
      <p className='text-secondary'>Contact:</p>
        <h6 className='text-light'><small className='foot-text'>Email: </small> TechMate@hotmail.com</h6>
        <p className='text-light'>copyright reserved © 2022</p>
    </div>
    <div>
          <p className='text-secondary'>Service around:</p>
          <h6 className='text-light'>Italy</h6>
    </div>
</div>
  );
};

export default Footer;