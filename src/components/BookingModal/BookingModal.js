// import { getAdditionalUserInfo } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

  const BookingModal = (content) => {
    const {user} = useContext(AuthContext);

  
    const handleBooking = event =>{
      event.preventDefault();
      const form = event.target;
      const name = form.name.value;
      const user_name = form.user_name.value;
      const email = form.email.value;
      const mobile = form.mobile.value;
      const resale_price = form.resale_price.value;
      const location = form.location.value;
  
      const booking = {
        name,
        user_name, 
        email,
        mobile,
        resale_price,
        location
      }
  
      fetch('http://localhost:5000/bookings', {
          method: 'POST',
          headers: {
                'content-type': 'application/json'
          },
          body: JSON.stringify(booking)
      })
       .then(res => res.json())
       .then(data => {
          console.log(data);
          if(data.acknowledged){
            toast.success('booking confirmed');
            // refetch();
          }
          else{
             toast.error(data.message);
          }
       })
  
    }

  return (
  <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle " />
      <div className="modal modal-bottom sm:modal-middle">
      <div className='bg-base-300 py-8 bg-base-300 px-20 w-[30rem] rounded-2xl'>
          <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10 '>
              <input name="user_name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered outline" />
              <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered outline" required /> 
              <input name="name" type="text" defaultValue={content.content.name} className="input w-full input-bordered outline" />
              <input name="resale_price" type="text" defaultValue={content.content.resale_price} className="input w-full outline bordered" />
              <input name="location" type="text"placeholder="Meeting location" className="input w-full input-bordered outline" />
              <input name="mobile" type="text" placeholder="Your phone Number" className="input w-full input-bordered outline mb-2" />
              <input className='btn btn-accent w-full outline' type="submit" value="submit" />
              </form>
              <div className="modal-action">
                  <label htmlFor="booking-modal" className="btn bg-base-300 text-black hover:text-white">close</label>
             </div>
         </div>
      </div>
      </div>
  );
};

export default BookingModal;