import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import useTitle from '../../Shared/hooks/useTitle';
import Categories from '../../components/Categories/Categories';

const Home = () => {
  useTitle('Home');

  return (
    <div>
      <Carousel></Carousel>
    <div className='text-center mb-5'>
    <Categories></Categories>
    </div>

    </div>
  );
};

export default Home;