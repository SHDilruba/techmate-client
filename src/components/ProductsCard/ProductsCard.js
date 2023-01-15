import React from 'react';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const ProductsCard = ({ product }) => {
    const {_id, name, published_date, img, location, resale_price, original_price, used, description, condition, mobile } = product;
    
    return (
      <div className="card h-[40rem] w-[27rem]  bg-base-100 shadow-xl md:mb-0 mx-auto">
        <figure className="mx-4 mt-4 h-[12rem]">
            <img src={img} alt="laptop" className="rounded" />
       </figure>
       <div className="card-body items-center text-center ">
           <h2 className="card-title text-2xl text-accent">{name}</h2>
           <p>{description}</p>
           <div className='flex justify-between text-sm mt-3'>
              <div className='mr-5 bg-base-200 p-5'>
                  <p>Year of purchase: <span className='text-secondary'>{used}</span></p>
                  <p>Condition: <span className='text-secondary'>{condition}</span></p>
                  <p>Original Price: <span className='text-red-500 line-through'>${original_price}</span></p>
              </div>
              <div className='bg-base-200 p-5'>
                   <p>Published: <span className='text-secondary'>  {published_date}</span></p>
                  <p>Location: <span className='text-secondary'> {location}</span></p>
                  <p>mobile: <span className='text-secondary'>  {mobile}</span></p>
              </div>
           </div>
        <div className="card-actions items-center justify-center mt-3 bg-accent px-6 py-3 rounded-lg ">
          <div className='mr-10'>
                <p className='text-2xl font-semibold rounded-md px-4 py-1 text-white'>Price: ${resale_price}</p>                         
          </div>
          <PrimaryButton>Book Now</PrimaryButton>
        </div>
     </div>
  </div>
    );
};

export default ProductsCard;