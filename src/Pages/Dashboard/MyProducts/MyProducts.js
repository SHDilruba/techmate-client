import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTitle from '../../../Shared/hooks/useTitle';

const MyProducts = () => {
  useTitle('MyProducts');

  const {user, logOut} =  useContext(AuthContext);

  const [products, setProducts] = useState([]);

  useEffect(() =>{
        fetch(`http://localhost:5000/myProducts?email=${user.email}`, {
             headers: {
                 authorization: `Bearer ${localStorage.getItem('accessToken')}`
             }
        })
        .then(res => {
         if(res.status === 401 || res.status === 403){
             logOut();
         }
         return res.json()
        })
        .then(data => {
          setProducts(data);
        })
  }, [user?.email]);

  return (
      <div className=' mb-20'>
           <h3 className="mb-8 text-4xl text-accent my-10 ml-5">Your {products.length} {products.length > 1 ? 'Products' : 'product'}</h3>
           <div className="overflow-x-auto w-full">
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
                products?.map((p, i) => <tr key={p._id}>
                   <th className='bg-gradient-to-l from-secondary to-accent text-center'>{i+1}</th>
                  <td className='bg-gradient-to-l from-secondary to-accent'><img className='w-20 mx-auto' src={p.img} alt="" /></td>
                  <td className='bg-gradient-to-l from-secondary to-accent text-center'>{p.name}</td>
                  <td className='bg-gradient-to-l from-secondary to-accent text-center'>{p.resale_price}</td>
                  <td className='bg-gradient-to-l from-secondary to-accent text-center'><button className='btn btn-xs btn-outline bg-white outline'>Add</button></td>
                  <td className='bg-gradient-to-l from-secondary to-accent text-center'><button  className='btn btn-xs outline bg-red-600 hover:bg-white hover:text-red-500'>Delete</button></td>
                </tr> )
           }
      </tbody>
    </table>
          </div>
     </div>
    );
  };

export default MyProducts;
