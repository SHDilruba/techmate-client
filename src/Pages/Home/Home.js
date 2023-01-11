import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import useTitle from '../../Shared/hooks/useTitle';
import Categories from '../../components/Categories/Categories';

const Home = () => {
  useTitle('Home');

    // const [newses, setNewses] = useState([]);
    
    // useEffect( () => {
    //   fetch('http://localhost:5000/category')
    //   .then(res => res.json())
    //   .then(data =>setNewses(data));
    // },[]);

  return (
    <div>
      <Carousel></Carousel>
    <div className='text-center mb-5'>
    <Categories></Categories>
    </div>
{/* 
      <div className='container text-center'>
      <h1>News title:{newses.length} </h1>
     {
       newses.map(news => <>
       <p>{news.title}</p>
       <p>View: {news.total_view}</p>
       <Link to={`/category/${news._id}`}> <button>Details</button> </Link>
       </>
       )
     }
      </div> */}

    </div>
  );
};

export default Home;