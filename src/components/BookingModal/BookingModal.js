import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const BookingModal = ({children}) => {
  const {user} = useContext(AuthContext);

  const [isBooked, setIsBooked] = useState(false);

   const handleBooking = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const img = form.img.value;
        const user_name = form.user_name.value;
        const email = form.email.value;
        const mobile = form.mobile.value;
        const resale_price = form.resale_price.value;
        const location = form.location.value;
    
   const booking = {
          name,
          img,
          user_name, 
          email,
          mobile,
          resale_price,
          location,
        }

          fetch('https://techmate-server2.vercel.app/bookings', {
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
            setIsBooked(true);
          }
          else{
             toast.error(data.message);
          }
       })
  
    }

  return (
   <div className='mt-28'>
      <input type="checkbox" id="booking-modal" className="modal-toggle " />
        <div className="modal modal-bottom sm:modal-middle">
          <div className='bg-base-300 py-10 px-10 w-[30rem] rounded-2xl'>
             <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-3 '>
                  <input name="user_name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name"                   
                  className="input w-full input-bordered outline" />
                  <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered outline" required /> 
                  <input name="name" type="text" defaultValue={children.name} className="input w-full input-bordered outline" disabled placeholder="Product Name" />
                  <input name="img" type="url" className="input w-full input-bordered outline" defaultValue={children.img} />
                  <input name="resale_price" type="text" defaultValue={children.resale_price} className="input w-full outline bordered" disabled placeholder="Product Price" />
                  <input name="location" type="text"placeholder="Meeting location" className="input w-full input-bordered outline" />
                  <input name="mobile" type="text" placeholder="Your phone Number" className="input w-full input-bordered outline mb-2" />
                  <input className='btn btn-secondary  bg-gradient-to-r from-secondary to-accent w-full outline' type="submit" 
                  disabled={isBooked}
                  value='Confirm to Booking' />
              </form>
                   <div className="modal-action">
                   <label htmlFor="booking-modal" className="btn btn-sm hover:bg-white hover:text-black">close</label>
                </div>
            </div>
         </div>
    </div>
  );
};

export default BookingModal;