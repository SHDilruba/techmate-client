import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyWishList = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/wishlist?email=${user?.email}`;
   
    const { data: wishlist = [] } = useQuery({
         queryKey: ['wishlist', user?.email],
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
            <h3 className="mb-8 text-4xl text-accent my-10 ml-5">My Wishlist</h3>
            <div className="overflow-x-auto w-full">
            <table className="table w-full">
       <thead>
         <tr>
           <th >Quantity</th>
           <th>Image</th>
           <th>Name</th>
           <th>Price</th>
           <th>Payment</th>
         </tr>
       </thead>
       <tbody>  
            {
              wishlist &&
               wishlist?.map((p, i) => <tr key={p._id}>
                 <th className='text-[0.7rem] md:text-[1rem]'>{i+1}</th>
                 <td><img className='w-[3rem] md:w-[10rem]' src={p.img} alt="" /></td>
                 <td className='text-[0.5rem] md:text-[1.2rem]'>{p.name}</td>
                 <td className='text-[0.6rem]md:text-[1.5rem]'>{p.resale_price}</td>
                 <td>
                   {
                      p.resale_price && !p.paid && <Link to={`/dashboard/payment/${p._id}`}>
                         <button 
                             className='btn btn-accent btn-sm text-[0.7rem] md:text-[1.2rem]'
                        >Buy</button>
                      </Link>
                   }
                   {
                      p.resale_price && p.paid && <span className='text-green-500'
                      >Paid</span>
                   }
                 </td>
               </tr> )
            }
       </tbody>
     </table>
           </div>
      </div>
     );
   };

export default MyWishList;