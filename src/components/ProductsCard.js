import React from 'react';
import PrimaryButton from './PrimaryButton/PrimaryButton';

const ProductsCard = ({ product }) => {
    const {_id, name, published_date, img, location, resale_price, original_price, used } = product;
    
    return (
      <div className="card h-[32rem] w-96 bg-base-100 shadow-xl mb-8 md:mb-0 mx-auto">
        <figure className="px-10 pt-10">
            <img src={img} alt="laptop" className="rounded-xl h-[12rem] w-full " />
       </figure>
       <div className="card-body items-center text-center ">
           <h2 className="card-title text-2xl text-secondary">{name}</h2>
            <p>Used: {used}</p>
            <p>Original price: <span className='line-through text-red-600'>${original_price}</span></p>
            <p>Location: {location}</p>
        <div className="card-actions items-center mt-3">
          <div className='mr-5 bg-secondary text-bold text-white px-3 py-1 rounded-md'>
                <p className='text-xl p-1'>Price: ${resale_price}</p>           
          </div>
             <PrimaryButton>Buy Now</PrimaryButton>
        </div>
     </div>
  </div>
    );
};

export default ProductsCard;