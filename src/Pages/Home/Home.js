import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import useTitle from '../../Shared/hooks/useTitle';
import Categories from '../../components/Categories/Categories';
import Accordion from '../../components/Accordion/Accordion';

const Home = () => {
  useTitle('Home');

  return (
    <div>
      <Carousel></Carousel>
    <div className='text-center mb-5'>
    <Categories></Categories>
    </div>
       <Accordion></Accordion>
    </div>
  );
};

export default Home;