import React from 'react';
import logo2 from "../../assets/icons/logo2.jpeg";

const Footer = () => {
  return (
    <div className='md:flex justify-between text-center py-[4rem] md:py-[6rem] md:px-40 bg-base-200 mx-auto shadow-xl'>
      <div className='invisible md:visible relative top-12'>
          <img className="w-16 h-10 rounded-md p-0.5 bg-gradient-to-r from-secondary to-accent shadow-4xl absolute bottom-[5rem] left-5"src={logo2} alt="" />
          <h2 className='text-2xl text-accent'>TechMate</h2>
       </div>
    <div>
      <p className='text-secondary'>Contact:</p>
        <h6 className='text-light'><small className='foot-text'>Email: </small> TechMate@hotmail.com</h6>
        <p className='text-light'>copyright reserved © 2022</p>
    </div>
   
    <div>
          <p className='text-secondary'>Service:</p>
          <p>Across all regions</p>
          <h4 className='text-[1.1rem]'>Italy</h4>
    </div>
</div>
  );
};

export default Footer;