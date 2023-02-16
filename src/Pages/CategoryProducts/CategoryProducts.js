import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../../components/BookingModal/BookingModal';
import Cards from '../../components/Cards/Cards';
import WishListModal from '../../components/WishListModal/WishListModal';

const CategoryProducts = () => {
    const categoryProducts = useLoaderData();
    const [modalContent, setModalContent] = useState([]);

     const [isBooked, setIsBooked] = useState(false);

    const refetch = useQuery;

    return (
          <div className='mt-7 mb-10 md:mb-28 md:mx-40'>
              <h2 className='text-[1.3rem] md:text-[2.1rem] mb-[1.5rem] md:mb-[3rem] text-center font-sans text-accent-focus'>This Category has {categoryProducts.length} {categoryProducts.length > 1 ? 'items available' : 'item available'}</h2>
              <div className='grid grid-cols-1 lg:grid-cols-2 mx-auto lg:mx-10 rounded-xl gap-10'>
            {  categoryProducts &&
                categoryProducts?.map(product => <Cards
                    children={product}
                    key={product._id}
                    setModalContent={setModalContent}
                ></Cards> )
            }
           </div>
               {
                modalContent?.map(content =><BookingModal 
                    key={content._id} 
                    children={content}
                    setIsBooked={setIsBooked}
                    isBooked={isBooked}
                    refetch={refetch}
                    ></BookingModal>)
               }
                {
                modalContent?.map(content =><WishListModal
                    key={content._id} 
                    children={content}
                    ></WishListModal>)
               }
          </div>
    );
};

export default CategoryProducts;