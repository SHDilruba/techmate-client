import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductsCard from '../../components/ProductsCard';

const CategoryProducts = () => {
    const categoryProducts = useLoaderData();
    // console.log(categoryProducts);
    
    return (
          <div>
              <h2 className='text-4xl mt-10 mb-10 text-center font-sans text-secondary'>This Category has available: {categoryProducts.length} {categoryProducts.length > 1 ? 'items' : 'item'}</h2>
               <div className='bg-accent pb-5 pt-10 md:mx-40 rounded-xl'>          
           <div className='lg:flex justify-center gap-8 mx-auto container'>
            {
                categoryProducts.map(product =><ProductsCard
                    key={product._id}
                    product={product}
                ></ProductsCard>)
            }
           </div>
        </div>
          </div>
    );
};

export default CategoryProducts;