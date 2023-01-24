import React, { useContext, useEffect, useState } from "react";
import { BeakerIcon } from '@heroicons/react/24/solid';


const ProductsCard = ({ product, setModalContent }) => {
  const {
    name,
    seller_name,
    seller_quality,
    published_date,
    img,
    location,
    resale_price,
    original_price,
    used,
    description,
    condition,
    mobile,
  } = product;

  const changeContent = (product) => {
    setModalContent([product]);
};

  return (
    <div className="card h-full w-full md:w-[27rem] bg-base-100 shadow-xl md:mb-0 mx-auto">
      <figure className="mx-4 mt-4 lg:h-[12rem]">
        <img src={img} alt="laptop" className="rounded" />
      </figure>
      <div className="card-body items-center text-center">

        <h2 className="card-title text-2xl text-accent">{name}</h2>
        <div className="flex justify-center items-center">
            <h6 className="text-xl text-secondary">{seller_name}</h6>
            <div className='ml-1 '>
            {seller_quality === 'verified' ? 
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
                : ''
              }
            </div>
        </div>
       <div><p>{description}</p></div>
        <div className="flex justify-between text-[0.5rem] md:text-[0.8rem] mt-3">
          <div className="mr-5 bg-base-200 p-5">
            <p>
              Year of purchase: <span className="text-secondary">{used}</span>
            </p>
            <p>
              Condition: <span className="text-secondary">{condition}</span>
            </p>
            <p>
              Original Price: 
              <span className="text-red-500 line-through">
                {original_price}
              </span>
            </p>
          </div>
          <div className="bg-base-200 p-5">
            <p>
              Published:
              <span className="text-secondary"> {published_date}</span>
            </p>
            <p>
              Location: <span className="text-secondary"> {location}, Italy</span>
            </p>
            <p>
              mobile: <span className="text-secondary"> {mobile}</span>
            </p>
          </div>
        </div>
       
        <div className="card-actions items-center justify-center mt-3 bg-accent py-3 rounded-lg md:w-full">
          <div className="md:mr-2">
            <p className="text-xl font-semibold rounded-md py-1 text-white">
              Price: {resale_price}
            </p>
          </div>
           
          <label
              onClick={()=>changeContent(product)}
              htmlFor="Wishlist-modal"
              className="btn w-1/4 bg-base-300 hover:bg-secondary hover:text-white rounded text-secondary mr-2"
            > Add to Wishlist
          </label>
          <label
            onClick={()=>changeContent(product)}
            htmlFor="booking-modal"
            className="btn btn-secondary bg-gradient-to-l from-secondary to-accent rounded text-white"
          > Book Now 
          </label> 

        </div>
      </div>
    </div>
  );
};

export default ProductsCard;

