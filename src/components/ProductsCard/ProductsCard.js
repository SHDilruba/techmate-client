import React, { useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

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
    <div className="card relative h-full w-full md:w-[28rem] bg-base-100 shadow-xl md:mb-0 mx-auto">
      <PhotoProvider>
        <PhotoView src={img}>
          <figure className="lg:h-[16rem]">
              <img src={img} alt="laptop" className="rounded" />
          </figure>
        </PhotoView>
     </PhotoProvider>      
      <div className="card-body items-center text-center">
        <h2 className="card-title text-[1.4rem] text-accent-focus">{name}</h2>
        <div className="flex justify-center items-center">
            <h6 className="text-[1.2rem] text-secondary">{seller_name}</h6>
            <div className='ml-1 '>
            {seller_quality === 'verified' ? 
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
                : ''
              }
            </div>
        </div>
       <div className="px-1 text-[0.9rem]"><p>{description}</p></div>
        <div className="flex justify-between text-[0.4rem] md:text-[0.7rem] mt-3 mb-[4.5rem] gap-8">
          <div className="bg-base-200 px-7 py-3">
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
          <div className="bg-base-200 px-7 py-3">
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
        <div className="card-actions absolute bottom-6 justify-center items-center py-2 rounded-lg bg-accent px-6">
        <div className="bg-white rounded-lg">
            <p className="text-[1.2rem] font-semibold py-[0.6rem] text-secondary px-5">
             {resale_price}
            </p>
        </div> 
        <label
              onClick={()=>changeContent(product)}
              htmlFor="Wishlist-modal"
              className="btn bg-secondary text-white hover:bg-white hover:text-secondary ml-1 border-2 border-white hover:border-white"
            >Wishlist
          </label>
        <label
            onClick={()=>changeContent(product)}
            htmlFor="booking-modal"
            className="btn btn-secondary ml-1 bg-gradient-to-l from-secondary to-accent rounded-lg text-white border-2 border-white hover:border-2 hover:border-secondary"
          > Book Now 
         </label> 
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;

