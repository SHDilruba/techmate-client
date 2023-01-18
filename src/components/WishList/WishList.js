import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const WishList = (content) => {
    const {user} = useContext(AuthContext);

  
    const handleWishlist = event =>{
      event.preventDefault();
      const form = event.target;
      const name = form.name.value;
      const img = form.img.value;
      const user_name = form.user_name.value;
      const email = form.email.value;
      const resale_price = form.resale_price.value;
  
      const wishList = {
        name,
        img,
        user_name, 
        email,
        resale_price
      }
  
      fetch('http://localhost:5000/wishlist', {
          method: 'POST',
          headers: {
                'content-type': 'application/json'
          },
          body: JSON.stringify(wishList)
      })
       .then(res => res.json())
       .then(data => {
          console.log(data);
          if(data.acknowledged){
            toast.success('Successfully added to wishlist');
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
          <div className='bg-accent pb-16 px-8 w-[30rem] rounded-2xl'>
            <div className="modal-action">
               <label htmlFor="Wishlist-modal" className=" btn bg-transparent text-black hover:bg-white text-2xl">X</label>
             </div>
             <form onSubmit={handleWishlist} className='grid grid-cols-1 gap-3 mt-10 '>
                  <input name="user_name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered outline" />
                  <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered outline" required /> 
                  <input name="name" type="text" defaultValue={content.content.name} className="input w-full input-bordered outline" disabled placeholder="Product Name" />
                  <input name="resale_price" type="text" defaultValue={content.content.resale_price} className="input w-full outline bordered" disabled placeholder="Price" />
                  <input name="img" type="url" className="input w-full input-bordered outline" defaultValue={content.content.img} />
                  <input className='btn btn-secondary w-full outline' type="submit" value="Add to Wishlist" />
              </form>
            </div>
         </div>
    </div>
  );
};

export default WishList;