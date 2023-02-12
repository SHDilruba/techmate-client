import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';
import BookingModal from "../../components/BookingModal/BookingModal";
import WishListModal from "../../components/WishListModal/WishListModal";
import Cards from "../../components/Cards/Cards";

const AdsProductDetail = () => {
  const productDetail = useLoaderData();

const [modalContent, setModalContent] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/advertisementProducts")
    .then((res) => res.json())
    .then((data) => setModalContent(data));
}, []);

  return (
    <div>
      <h2 className="text-4xl text-center my-6 text-accent-focus font-serif">
        Product Detail
      </h2>
      <Cards
          children={productDetail}
          setModalContent={setModalContent}
      ></Cards>
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
