import React from 'react';
import img404 from '../../assets/banner/404.webp';

const About = () => {
  return (
    <div className='container mx-auto text-8xl font-serif text-secondary text-center my-16'>
       <h1 className='mb-2'>Sorry!!!</h1>
       <img className='mx-auto w-1/4' src={img404} alt="" /> 
    </div>
  );
};

export default About;