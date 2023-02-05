import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../../components/BookingModal/BookingModal';
import ProductsCard from '../../components/ProductsCard/ProductsCard';
import WishListModal from '../../components/WishListModal/WishListModal';

const CategoryProducts = () => {
    const categoryProducts = useLoaderData();
    const [modalContent, setModalContent] = useState([]);

    return (
          <div className='mt-7 mb-28 md:mx-40'>
              <h2 className='text-4xl mb-8 text-center font-sans text-accent-focus'>This Category has {categoryProducts.length} {categoryProducts.length > 1 ? 'items available' : 'item available'}</h2>
              <div className='grid grid-cols-1 lg:grid-cols-2 mx-auto lg:mx-10 px-5 py-6 rounded-xl gap-10'>
            {
                categoryProducts.map(product => <ProductsCard
                    product={product}
                    key={product._id}
                    setModalContent={setModalContent}
                ></ProductsCard> )
            }
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

export default CategoryProducts;