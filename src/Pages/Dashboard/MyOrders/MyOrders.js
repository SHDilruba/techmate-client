import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
   
    const { data: bookings = [] } = useQuery({
         queryKey: ['bookings', user?.email],
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
            <h3 className="mb-8 text-4xl text-accent pl-5 my-8">My Orders</h3>
            <div className="overflow-x-auto">
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
              bookings &&
               bookings?.map((booking, i) => <tr key={booking._id}>
                 <th>{i+1}</th>
                 <td><img className='w-[3rem] md:w-[6rem]' src={booking.img} alt="" /></td>
                 <td className='md:text-[1rem] p-0'>{booking.name}</td>
                 <td className='text-[0.8rem]md:text-[1.5rem] p-0'>{booking.resale_price}</td>
                 <td>
                   {
                      booking.resale_price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                         <button 
                             className='btn btn-accent btn-sm'
                        >Pay</button>
                      </Link>
                   }
                   {
                      booking.resale_price && booking.paid && <span className='text-green-500'
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

export default MyOrders;