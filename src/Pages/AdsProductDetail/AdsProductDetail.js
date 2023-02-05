import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import BookingModal from "../../components/BookingModal/BookingModal";
import WishListModal from "../../components/WishListModal/WishListModal";

const AdsProductDetail = () => {
  const productDetail = useLoaderData();
  


const [modalContent, setModalContent] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/advertisementProducts")
    .then((res) => res.json())
    .then((data) => setModalContent(data));
}, []);

const changeContent = (productDetail) => {
  setModalContent([productDetail]);
};

  return (
    <div>
      <h2 className="text-4xl text-center my-6 text-accent-focus font-serif">
        Product Detail
      </h2>
      <div className="card relative h-full w-full md:w-[28rem] bg-base-100 shadow-xl md:mb-0 mx-auto">
      <PhotoProvider>
        <PhotoView src={productDetail.img}>
          <figure className="lg:h-[16rem]">
              <img src={productDetail.img} alt="laptop" className="rounded" />
          </figure>
        </PhotoView>
     </PhotoProvider>      
      <div className="card-body items-center text-center">
        <h2 className="card-title text-[1.4rem] text-accent-focus">{productDetail.name}</h2>
        <div className="flex justify-center items-center">
            <h6 className="text-[1.2rem] text-secondary">{productDetail.seller_name}</h6>
            <div className='ml-1 '>
            {productDetail.seller_quality === 'verified' ? 
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
                : ''
              }
            </div>
        </div>
       <div className="px-1 text-[0.9rem]"><p>{productDetail.description}</p></div>
        <div className="flex justify-between text-[0.4rem] md:text-[0.7rem] mt-3 mb-[4.5rem] gap-6">
          <div className="bg-base-200  px-7 py-3">
            <p>
              Year of purchase: <span className="text-secondary">{productDetail.used}</span>
            </p>
            <p>
              Condition: <span className="text-secondary">{productDetail.condition}</span>
            </p>
            <p>
              Original Price:  
              <span className="text-red-500 line-through">
                {productDetail.original_price}
              </span>
            </p>
          </div>
          <div className="bg-base-200 px-7 py-3">
            <p>
              Published:
              <span className="text-secondary"> {productDetail.published_date}</span>
            </p>
            <p>
              Location: <span className="text-secondary"> {productDetail.location}, Italy</span>
            </p>
            <p>
              mobile: <span className="text-secondary"> {productDetail.mobile}</span>
            </p>
          </div>
        </div>       
        <div className="card-actions absolute bottom-6 justify-center items-center py-2 rounded-lg bg-accent px-6">
        <div className="bg-white rounded-lg">
            <p className="text-[1.2rem] font-semibold py-[0.6rem] text-secondary px-5">
             {productDetail.resale_price}
            </p>
        </div> 
        <label
              onClick={()=>changeContent(productDetail)}
              htmlFor="Wishlist-modal"
              className="btn bg-secondary text-white hover:bg-white hover:text-secondary ml-1 border-2 border-white hover:border-white"
            >Wishlist
          </label>
        <label
            onClick={()=>changeContent(productDetail)}
            htmlFor="booking-modal"
            className="btn btn-secondary ml-1 bg-gradient-to-l from-secondary to-accent rounded-lg text-white border-2 border-white hover:border-2 hover:border-secondary"
          > Book Now 
         </label> 
        </div>
      </div>
    </div>
     {
                modalContent.map(content =><BookingModal 
                    key={content._id} 
                    children={content}
                    ></BookingModal>)
               }
                {
                modalContent.map(content =><WishListModal
                  key={content._id} 
                  children={content}
                  ></WishListModal>)
               }
  </div>
  );
};

export default AdsProductDetail;
