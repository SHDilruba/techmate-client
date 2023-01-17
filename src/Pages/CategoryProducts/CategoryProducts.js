import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../../components/BookingModal/BookingModal';
import ProductsCard from '../../components/ProductsCard/ProductsCard';

const CategoryProducts = () => {
    const categoryProducts = useLoaderData();
    const [modalContent, setModalContent] = useState([]);

    return (
          <div className='my-10 md:mx-40'>
              <h2 className='text-4xl mb-8 text-center font-sans text-accent'>This Category has {categoryProducts.length} {categoryProducts.length > 1 ? 'items available' : 'item available'}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 mx-auto md:mx-20 px-5 bg-accent py-10 rounded-xl gap-6'>
            {
                categoryProducts.map(product => <ProductsCard
                    product={product}
                    key={product._id}
                    setModalContent={setModalContent}
                ></ProductsCard> )
            }
           </div>
               {
                modalContent.map(content => <BookingModal key={content._id} content={content}></BookingModal>)
               }
          </div>
    );
};

export default CategoryProducts;