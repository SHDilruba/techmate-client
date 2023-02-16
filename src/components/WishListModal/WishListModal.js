import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const WishListModal = ({children}) => {
  const {user} = useContext(AuthContext);

   const handleWishlist = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const img = form.img.value;
        const user_name = form.user_name.value;
        const email = form.email.value;
        const resale_price = form.resale_price.value;
        const booking = form.booking.value;
    
   const wishlist = {
          name,
          img,
          user_name, 
          email,
          resale_price,
          booking
        }

          fetch('https://techmate-server2.vercel.app/wishlist', {
          method: 'POST',
          headers: {
                'content-type': 'application/json'
          },
          body: JSON.stringify(wishlist)
      })
       .then(res => res.json())
       .then(data => {
          console.log(data);
          if(data.acknowledged){
            toast.success('Succesfuly added to the wishlist');
          }
          else{
             toast.error(data.message);
          }
       })
  
    }

  return (
   <div>
      <input type="checkbox" id="Wishlist-modal" className="modal-toggle " />
        <div className="modal modal-bottom sm:modal-middle">
          <div className='bg-base-300 py-10 px-12 w-[30rem] rounded-2xl'>
             <form onSubmit={handleWishlist} className='grid grid-cols-1 gap-3 mt-10 '>
                  <input name="user_name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered outline" />
                  <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered outline" required /> 
                  <input name="name" type="text" defaultValue={children.name} className="input w-full input-bordered outline" disabled placeholder="Product Name" />
                  <input name="img" type="url" className="input w-full input-bordered outline" defaultValue={children.img} />
                  <input name="resale_price" type="text" defaultValue={children.resale_price} className="input w-full outline bordered" disabled placeholder="Product Price" />
                  <input name="booking" type="text" defaultValue={children.booking} className="input w-full outline bordered hidden" disabled placeholder="booking status" />
                  <input className='btn btn-secondary w-full outline mt-3' type="submit" value="Confirm to add to WishList" />
              </form>
              <div className="modal-action">
               <label htmlFor="Wishlist-modal" className="btn btn-sm hover:bg-white hover:text-black">close</label>
             </div>
            </div>
         </div>
    </div>
  );
};

export default WishListModal;
