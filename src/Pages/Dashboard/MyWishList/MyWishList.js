import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useState } from 'react';
import MyWishListCard from '../../../components/MyWishListTable/MyWishListTable';
import BookingModal from '../../../components/BookingModal/BookingModal';
import { AuthContext } from '../../../contexts/AuthProvider';
import MyWishListTable from '../../../components/MyWishListTable/MyWishListTable';

const MyWishList = () => {
    const { user } = useContext(AuthContext);
    
    const [modalContent, setModalContent] = useState([]);
    
    const url = `https://techmate-server2.vercel.app/wishlist?email=${user?.email}`;

    const { data: wishlist = [], refetch } = useQuery({
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
       <div className='mb-20 md:mr-2'>
            <h3 className=" text-4xl text-accent my-10 ml-10">My Wishlist</h3>
            <div className="overflow-x-auto w-full">
  <table className="table w-full mx-auto  text-[0.4rem] md:text-[1.5rem]">
    <thead>
      <tr className='text-center'>
      <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Image</th>
      <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Name</th>
      <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Price</th>
      <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Booking</th>
      <th className='bg-gradient-to-l from-secondary to-accent text-white text-[0.4rem] md:text-[1rem]'>Cancel</th>
      </tr>
  </thead>
   <tbody className='text-center'>  
          {
             wishlist &&
             wishlist?.map((product) => <>
              <tr>
              <MyWishListTable
             key={product._id}
             product={product}
             wishlist={wishlist}
             refetch={refetch}
             setModalContent={setModalContent}
       ></MyWishListTable>
              </tr>
             </>
       
            )
          }
        </tbody>
      </table>
     </div>
         {
          modalContent.map(content => <BookingModal
            key={content._id}
             children={content}            
          ></BookingModal>)
         }
     </div>
   );
 };

export default MyWishList;