import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const Cards = ({children, setModalContent}) => {

 const refetch = useQuery;

 const changeContent = (children) => {
  setModalContent([children]);
};

const handleBooking = id =>{
 fetch(`http://localhost:5000/products/booking/${id}`,{
     method: 'PUT',
     headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
     }
 })
  .then(res => res.json())
  .then (data => {
      if(data.modifiedCount > 0){
        refetch();
      }
  })
};

 return (
  <div className="card relative h-full w-full md:w-[28rem] bg-base-100 shadow-xl md:mb-0 mx-auto">
  <PhotoProvider>
    <PhotoView src={children.img}>
      <figure className="lg:h-[16rem]">
          <img src={children.img} alt="laptop" className="rounded" />
      </figure>
    </PhotoView>
 </PhotoProvider>      
  <div className="card-body items-center text-center">
    <h2 className="card-title text-[1.4rem] text-accent-focus">
     {children.name}
     <span className="border-2 border-accent rounded-md text-black text-[0.8rem] px-2"> {children.booking ? 'Sold' : 'available'}</span>
    </h2>
    <div className="flex justify-center items-center">
        <div>
        {children.seller_quality === 'verified' ? 
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
            : ''
          }
        </div>
             <h6 className="text-[1.2rem] text-secondary ml-1">{children.seller_name}</h6>
    </div>
   <div className="px-1 text-[0.9rem]"><p>{children.description}</p></div>
    <div className="flex justify-between text-[0.4rem] md:text-[0.7rem] mt-3 mb-[4.5rem] gap-6">
      <div className="bg-base-200  px-7 py-3">
        <p>
          Year of purchase: <span className="text-secondary">{children.used}</span>
        </p>
        <p>
          Condition: <span className="text-secondary">{children.condition}</span>
        </p>
        <p>
          Original Price:  
          <span className="text-red-500 line-through">
            {children.original_price}
          </span>
        </p>
      </div>
      <div className="bg-base-200 px-7 py-3">
        <p>
          Published:
          <span className="text-secondary"> {children.published_date}</span>
        </p>
        <p>
          Location: <span className="text-secondary"> {children.location}, Italy</span>
        </p>
        <p>
          mobile: <span className="text-secondary"> {children.mobile}</span>
        </p>
      </div>
    </div>       
    <div className="card-actions absolute bottom-6 justify-center items-center py-2 rounded-lg bg-accent px-6">
    <div className="bg-white rounded-lg">
        <p className="text-[1rem] font-semibold py-[0.2rem] text-secondary px-6">
         {children.resale_price}
        </p>
    </div> 
    <label
          onClick={()=>changeContent(children)}
          htmlFor="Wishlist-modal"
          className="btn btn-sm bg-secondary text-white hover:bg-white hover:text-secondary ml-1 border-2 border-white hover:border-white"
        >Wishlist
      </label>
      { children.booking ?
       <label
       className="btn btn-sm ml-1 rounded-lg text-white"
     > UNAVAILABLE 
    </label>
    :
    <label
    onClick={()=> {
      changeContent(children)
      handleBooking(children._id)
    }}
    htmlFor="booking-modal"
    className="btn btn-sm btn-secondary ml-1 bg-gradient-to-l from-secondary to-accent rounded-lg text-white border-white hover:border-2 hover:border-secondary"
  > BOOK NOW 
 </label>

    } 
    </div>
  </div>
</div>
 );
};

export default Cards;