import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../Shared/hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import MyProductCards from '../../../components/MyProductCards/MyProductCards';

const MyProducts = () => {
  useTitle('MyProducts');

  const {user} =  useContext(AuthContext);
  const [myProducts, setMyProducts] = useState([]);
   
  const url = `http://localhost:5000/myProducts?email=${user?.email}`;
 
  const { data: products = [], refetch } = useQuery({
       queryKey: ['products', user?.email],
       queryFn: async () =>{
    const res = await fetch(url, {
             headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
             }
           });        
           const data = await res.json();
           return data;
       }
  });

  return (
      <div className=' mb-20'>
         <h3 className="mb-8 text-4xl text-accent my-10 ml-5">Your {products.length} {products.length > 1 ? 'Available Products' : 'Available product'}</h3>
         <div className="overflow-x-auto w-full">
         <div>
         <table className="table w-full">
           <thead>
                <tr>
                  <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]' >Quantity</th>
                  <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Image</th>
                  <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Name</th>
                  <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Price</th>
                  <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Advertisement</th>
                  <th className='text-secondary text-center text-[0.6rem] md:text-[1rem]'>Delete</th>
              </tr>
            </thead>
            <tbody className='text-white'>  
                    {
                      products &&
                          products?.map((product, i) => 
                           <>
                              <tr>
                                <MyProductCards 
                                  key={product._id}
                                    product={product}
                                    myProducts={myProducts}
                                    setMyProducts={setMyProducts}
                                    products={products}
                                    refetch={refetch}
                                ></MyProductCards> 
                            </tr>
                          </>
                        )
                      }
              </tbody>
            </table> 
          </div>
      </div>
    </div>
    );
 };

export default MyProducts;
