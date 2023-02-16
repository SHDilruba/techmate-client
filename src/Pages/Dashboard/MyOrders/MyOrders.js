import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import DeleteButton from '../../../components/DeleteButton/DeleteButton';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const url = `https://techmate-server2.vercel.app/bookings?email=${user?.email}`;
   
    const { data: bookings = [], refetch } = useQuery({
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

    const handleDelete = id =>{
      const proceed = window.confirm('Are you sure to cancel this product?')
      if(proceed){
        fetch(`https://techmate-server2.vercel.app/bookings/${id}`,{
        method: 'DELETE',
        headers: {
          authorization: `bearer ${localStorage.getItem('accessToken')}`
       }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert('deleted successfully')
        refetch();
       })
      }
     };
   
     return (
       <div className=' mb-20'>
            <h3 className="mb-8 text-4xl text-accent ml-10 my-10">My Orders</h3>
            <div className="overflow-x-auto">
            <table className="table w-full">
       <thead>
         <tr className='text-secondary text-center'>
           <th className='hidden md:block border-2 border-accent bg-gradient-to-l from-secondary to-accent text-white text-[1rem]'>{bookings?.length} {bookings?.length > 1 ? 'ORDERS' : 'ORDER'}</th>
           <th className='border-2 border-accent bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Image</th>
           <th className='border-2 border-accent bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Price</th>
           <th className='border-2 border-accent bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Name</th>
           <th className='border-2 border-accent bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Payment</th>
           <th className='border-2 border-accent bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Cancel</th>
         </tr>
       </thead>
       <tbody className='text-center md:mr-6'>  
            {
              bookings &&
               bookings?.map((booking, i) => <tr className='h-[4rem] border-2 border-secondary' key={booking._id}>
                <th className='hidden md:block text-[1.2rem] py-8'>{i+1}</th>
                 <td className='border-2 border-secondary'>
                 <PhotoProvider>
                    <PhotoView src={booking.img}>
                       <img className='w-[3rem] sm:w-[6rem] mx-auto' src={booking.img} alt="" />
                    </PhotoView>
                </PhotoProvider> </td>
                 <td className='text-[0.5rem] md:text-[1.1rem] border-2 border-secondary'>{booking.name}</td>
                 <td className='text-[0.5rem] md:text-[1.3rem] border-2 border-secondary'>{booking.resale_price}</td>
                 <td className='border-2 border-secondary' >
                   {
                      booking.resale_price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                         <button
                             className='btn btn-xs btn-accent outline rounded-lg text-white text-[0.4rem] md:text-[0.8rem]'
                        >Pay Now</button>
                      </Link>
                   }
                   {
                      booking.resale_price && booking.paid && <span className='text-accent text-semibold'
                      >Paid</span>
                   }
                 </td>
                 <td onClick={() => handleDelete(booking._id)}
                 className='border-2 border-secondary'>
                     <DeleteButton
                    >Cancel</DeleteButton>
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